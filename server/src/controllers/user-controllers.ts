import prisma from '../prisma/client';
import { RequestHandler } from 'express';
import {
  body,
  Meta,
  ValidationChain,
  validationResult,
} from 'express-validator';
import jwt from 'jsonwebtoken';

import { genPassword, validPassword } from '../lib/passwordUtils';
import config from '../config/config';

type SafeUser = {
  firstname: string;
  email: string;
  isLoggedIn: boolean;
};

// validation error msgs
const alphaErr = 'Must only contain letters.';
const lengthErr = 'Must be between 1 and 10 characters.';
const pwLengthErr = 'Password must be between 4 to 16 characters';
const emailErr = 'Must be a valid email';
const usedEmailErr = 'This email has an account';

// field validations
const validateUser = [
  body('firstname')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastname')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage(emailErr)
    .toLowerCase()
    .custom(checkEmail),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 4, max: 16 })
    .withMessage(pwLengthErr),
  body('confirmPw').trim().notEmpty().custom(matchPw).withMessage(''),
];

// ---- Custom validators ----
async function checkEmail(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) {
    throw new Error(usedEmailErr);
  }
}

async function matchPw(confirmPassword: string, { req }: Meta) {
  const password = req.body?.password;
  if (password !== confirmPassword) {
    throw new Error('Passwords must match');
  }
}

// ---- ROUTE HANDLERS ----

// Route GET /login -> check in user is logged in
export const getLogin: RequestHandler = (req, res) => {
  const user = req.user;
  if (user) {
    const safeUser: SafeUser = {
      email: user.email,
      firstname: user.firstname,
      isLoggedIn: true,
    };
    res.json(safeUser);
    return;
  } else {
    res.json({ isLoggedIn: false });
  }
};

// Route POST /login
export const postLogin: RequestHandler = async (req, res) => {
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

// Route POST /logout
export const postLogout: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.json({ message: 'user logged out' });
};

export const newUser: (ValidationChain[] | RequestHandler)[] = [
  validateUser,
  async (req, res): Promise<void> => {
    const { firstname, lastname, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
      return;
    }

    const { salt, hashPw } = genPassword(password);

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashPw,
        salt,
      },
    });

    res.json({
      user,
      message: 'User created successfully',
    });
  },
];
