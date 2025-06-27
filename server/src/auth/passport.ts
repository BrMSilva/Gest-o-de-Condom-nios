import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyCallback = async (jwt_payload, done) => {
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
