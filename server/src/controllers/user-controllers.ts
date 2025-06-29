import prisma from '../prisma/client';
import {
  body,
  Meta,
  ValidationChain,
  validationResult,
} from 'express-validator';
import { genPassword } from '../lib/passwordUtils';
import { RequestHandler } from 'express';

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

//---middlewares---

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

export const getJwtUser: RequestHandler = (req, res) => {
  const user = req.user;
  if (user) {
    const safeUser = {
      email: user.email,
      firstname: user.firstname,
      isAuth: true,
    };
    res.json(safeUser);
    return;
  } else {
    res.json({ isAuth: false });
  }
};
