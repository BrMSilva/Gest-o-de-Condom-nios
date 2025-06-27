import { Router } from 'express';
import passport from 'passport';
const router = Router();

import { newUser, getSessionUser } from '../controllers/user-controllers.ts';

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getSessionUser,
);

//Register new user
router.post('/register', newUser);

export default router;
