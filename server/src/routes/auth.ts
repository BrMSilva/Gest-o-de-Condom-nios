import { Router } from 'express';
import prisma from '../prisma/client.ts';
import jwt from 'jsonwebtoken';
import { validPassword } from '../lib/passwordUtils.ts';
import config from '../config/config.ts';

const router: Router = Router();

router.post('/login', async (req, res): Promise<any> => {
  try {
    //get user from username
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: 'Incorrect email',
      });

    //else check password
    const match = validPassword(req.body.password, user.password, user.salt);

    if (!match)
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });

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
    return;
  } catch (err) {
    console.log(err);
    return res
      .status(405)
      .json({ success: false, message: 'Error!', error: err });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.json({ message: 'user logged out' });
});

export default router;
