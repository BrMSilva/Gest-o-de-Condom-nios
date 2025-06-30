import express from 'express';
const server = express();

import 'dotenv/config';
import './auth/passport';
import cors from 'cors';

import routes from './routes/index';
import config from './config/config';

//---- MIDDLEWARE FUNCTIONS ----
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  cors({
    origin: config.clientHost,
    optionsSuccessStatus: 200,
  }),
);

//---- ROUTES ----
server.use('/users', routes.users);
server.use('/protected', routes.protectedRouter);

//---- SERVER ----
server.listen(config.port, () => {
  console.log(`Server online on ${config.port}`);
});
