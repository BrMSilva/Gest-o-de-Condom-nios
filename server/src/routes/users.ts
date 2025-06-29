import { Router } from 'express';
import passport from 'passport';
const router = Router();

import { newUser, getJwtUser } from '../controllers/user-controllers';

router.get('/', passport.authenticate('jwt', { session: false }), getJwtUser);

//Register new user
router.post('/register', ...newUser);

export default router;
