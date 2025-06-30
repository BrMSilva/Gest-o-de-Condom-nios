import passport from 'passport';
import { Router } from 'express';
const router = Router();

import {
  postRegister,
  getLogin,
  postLogin,
  postLogout,
} from '../controllers/user-controllers';

// ---- Testing check ----
if (process.env.NODE_ENV === 'test') {
  router.get('/', (_req, res) => {
    res.status(200).json({ res: 'ok' });
  });
}

// ---- LOGIN ----
router.get(
  '/login',
  passport.authenticate('jwt', { session: false }),
  getLogin,
);
router.post('/login', postLogin);
router.post('/logout', postLogout);

// ---- POST ROUTES ----
router.post('/register', ...postRegister);

export default router;
