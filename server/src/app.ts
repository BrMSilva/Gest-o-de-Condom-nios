import express from 'express';
const app = express();

import 'dotenv/config';
import './auth/passport';
import cors from 'cors';

import routes from './routes/index';
import config from './config/config';

//---- MIDDLEWARE FUNCTIONS ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//---- CORS SETTINGS ----
app.use(
  cors({
    origin: config.clientHost,
    optionsSuccessStatus: 200,
  }),
);

//---- ROUTES ----
app.use('/users', routes.users);
app.use('/protected', routes.protectedRouter);

export default app;
