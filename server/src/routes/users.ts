import passport from 'passport';
import { Router } from 'express';
const router = Router();

import {
  newUser,
  getLogin,
  postLogin,
  postLogout,
} from '../controllers/user-controllers';

// ---- LOGIN ----
router.get(
  '/login',
  passport.authenticate('jwt', { session: false }),
  getLogin,
);
router.post('/login', postLogin);
router.post('/logout', postLogout);

// ---- POST ROUTES ----
router.post('/register', ...newUser);

export default router;
