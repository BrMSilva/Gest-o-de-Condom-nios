import request from 'supertest';
import app from '../app.js';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test('testing route works', (done) => {
  request(app)
    .get('/users/')
    .expect('Content-Type', /json/)
    .expect({ res: 'ok' })
    .expect(200, done);
});

test('POST /login - login fails with wrong email', (done) => {
  request(app)
    .post('/users/login')
    .send({ email: 'notareal@email.com' })
    .expect('Content-Type', /json/)
    .expect({
      success: false,
      message: 'Incorrect email',
    })
    .expect(401, done);
});

test('POST /login - login fails with wrong password', (done) => {
  request(app)
    .post('/users/login')
    .send({ email: 'teste@teste.com', password: 'wrong-password' })
    .expect('Content-Type', /json/)
    .expect({
      success: false,
      message: 'Incorrect password',
    })
    .expect(401, done);
});

test('POST /login - success with correct credentials, returns user from GET /users/login', (done) => {
  request(app)
    .post('/users/login')
    .send({ email: 'teste@teste.com', password: 'teste' })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(typeof res.body.token).toBe('string');
      expect(res.body.token.length).toBeGreaterThan(10);

      request(app) // use the token to GET a protected route
        .get('/users/login')
        .auth(res.body.token, { type: 'bearer' })
        .expect(
          {
            email: 'teste@teste.com',
            firstname: 'teste',
            isLoggedIn: true,
          },
          done,
        );
    })
    .catch((err) => done(err));
});

test('POST /register - validation fails with missing fields', (done) => {
  request(app)
    .post('/users/register')
    .send({}) // missing fields
    .expect('Content-Type', /json/)
    .expect(400)
    .expect((res) => {
      if (!Array.isArray(res.body.errors)) {
        throw new Error('Expected validation errors array');
      }
    })
    .end(done);
});

type RegisterForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPw: string;
};
const correctForm: RegisterForm = {
  firstname: 'user',
  lastname: 'lastname',
  email: 'user@user.com',
  password: 'user',
  confirmPw: 'user',
};

test('POST /register - validation fails with wrongly formated fields', (done) => {
  //firstname too long
  request(app)
    .post('/users/register')
    .send({ ...correctForm, firstname: 'a-name-thats-too-long' })
    .expect('Content-Type', /json/)
    .expect(400)
    .then((res) => {
      const errorMsg = 'First name Must be between 1 and 10 characters.';
      const lengthError = res.body.errors?.find(
        (err: { msg: string }) => err.msg === errorMsg,
      );

      expect(lengthError).toBeDefined();
      done();
    }, done);
});
