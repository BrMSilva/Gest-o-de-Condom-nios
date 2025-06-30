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
const goodForm: RegisterForm = {
  firstname: 'user',
  lastname: 'lastname',
  email: 'user@user.com',
  password: 'user',
  confirmPw: 'user',
};
const badForm: RegisterForm = {
  firstname: '',
  lastname: '123',
  email: 'bademail',
  password: '123',
  confirmPw: '12',
};

test('POST /register - validation fails with wrongly formated fields', (done) => {
  request(app)
    .post('/users/register')
    .send(badForm)
    .expect('Content-Type', /json/)
    .expect(400)
    .expect((res) => {
      expect(res.body).toHaveProperty('errors');
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors.length).toBe(7);
    })
    .end(done);
});

test('POST /register - validation fails with existing email', (done) => {
  request(app)
    .post('/users/register')
    .send({ ...goodForm, email: 'teste@teste.com' })
    .expect('Content-Type', /json/)
    .expect(400)
    .expect((res) => {
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors[0].msg).toBe('This email has an account');
    })
    .end(done);
});

test('POST /resgister - creates user', (done) => {
  request(app)
    .post('/users/register')
    .send(goodForm)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res) => {
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(res.body).toHaveProperty('user', {
        firstname: goodForm.firstname,
        email: goodForm.email,
        isLoggedIn: false,
      });

      request(app)
        .post('/users/login')
        .send({ email: goodForm.email, password: goodForm.password })
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
                email: goodForm.email,
                firstname: goodForm.firstname,
                isLoggedIn: true,
              },
              done,
            );
        })
        .catch((err) => done(err));
    })
    .catch((err) => done(err));
});
