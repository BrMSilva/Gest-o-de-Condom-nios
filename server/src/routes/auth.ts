import prisma from '../prisma/client';
import jwt from 'jsonwebtoken';
import { validPassword } from '../lib/passwordUtils';
import config from '../config/config';
import { Router } from 'express';
import { AsyncHandler } from '../../types/express-utils';

const router: Router = Router();

router.get('/test', (_req, res) => {
  res.status(200).json({ res: 'ok' });
});

// put in controller
const postLogin: AsyncHandler = async (req, res) => {
  try {
    //get user from username
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Incorrect email',
      });
      return;
    }

    //else check password
    const match = validPassword(req.body.password, user.password, user.salt);

    if (!match) {
      res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
      return;
    }

    //else was successfull return jwt token
    jwt.sign(
      { sub: user.id },
      config.jwtSecret,
      { expiresIn: '1d' },
      (err, token) => {
        res.json({
          success: true,
          token,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(405).json({ success: false, message: 'Error!', error: err });
  }
};

router.post('/login', postLogin);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.json({ message: 'user logged out' });
});

export default router;
