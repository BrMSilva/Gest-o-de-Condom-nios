import routes from '../routes/index.js';

import request from 'supertest';
import express, { urlencoded } from 'express';
const app = express();

app.use(urlencoded({ extended: false }));
app.use('/users', routes.users);

test('testing route works', (done) => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect({ res: 'ok' })
    .expect(200, done);
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
