import passport from 'passport';
import passportJwt from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';
import config from '../config/config';

const { Strategy: JwtStrategy } = passportJwt;

type JwtPayload = {
  sub: string;
};

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const verifyCallback = async (
  jwt_payload: JwtPayload,
  done: passportJwt.VerifiedCallback,
) => {
  try {
    console.log(jwt_payload);
    //get user from the token
    const user = await prisma.user.findUnique({
      where: { id: jwt_payload.sub },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);
