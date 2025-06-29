import routes from '../routes/index.js';

import request from 'supertest';
import express, { urlencoded } from 'express';
const app = express();

app.use(urlencoded({ extended: false }));
//---- ROUTES ----
app.use('/users', routes.users);
app.use('/auth', routes.auth);
app.use('/protected', routes.protectedRouter);

test('testing route works', (done) => {
  request(app)
    .get('/auth/test')
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
