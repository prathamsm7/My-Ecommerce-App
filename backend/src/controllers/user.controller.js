const express = require('express');
const { validationResult, check } = require('express-validator');
const res = require('express/lib/response');
const router = express.Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const newToken = (user) => {
  return jwt.sign({ user }, `${process.env.JWT_SECRET}`, { expiresIn: '365d' });
};

router.get('/demo', async (req, res) => {
  try {
    return res.send('Demo route');
  } catch (error) {
    return res.send(error.message);
  }
});

router.post(
  '',
  [
    check('firstName', 'Firstname should be atleast 3 characters').isLength({
      min: 3,
    }),
    check('lastName', 'Lastname should be atleast 3 characters').isLength({
      min: 3,
    }),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.'
    )
      .trim()
      .isString()
      .isLength({ min: 8 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlphanumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg,
        });
      }

      let user = await User.findOne({ email: req.body.email }).lean().exec();

      if (user) {
        return res.status(400).send({ message: 'Email is already Registred' });
      }

      user = await User.create(req.body);

      const { _id, firstName, lastName, email } = user;

      res.send({ user: { _id, firstName, lastName, email } });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isString().isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      // error handling
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg,
        });
      }

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(400)
          .send({ message: 'User not found with this email' });
      }

      const match = user.checkPassword(req.body.password);

      if (!match) {
        return res.status(400).send({ message: 'Invalid credintials !' });
      }

      const token = newToken(user);

      return res.send({ user, token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

module.exports = router;
