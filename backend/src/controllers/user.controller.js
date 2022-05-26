const express = require('express');
const { validationResult, check } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.USER}`,
    pass: `${process.env.PASS}`,
  },
});

const newToken = (user) => {
  return jwt.sign({ user }, `${process.env.JWT_SECRET}`, { expiresIn: '365d' });
};

//Signup User
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

//Login User
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

      let user = await User.findOne({ email: req.body.email }).exec();

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

      user = {
        role: user.role,
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return res.send({ user, token });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

//Forgot password

router.put(
  '/forgot-password',
  [check('email', 'Email is required').isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg,
        });
      }

      const { email } = req.body;

      // find the user
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({
          message: 'User not found !',
        });
      }

      // if user found in DB --> create token
      const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`, {
        expiresIn: '15m',
      });

      let currentDate = new Date();

      const data = {
        from: process.env.USER,
        to: email,
        subject: 'Password Reset Link',
        html: `
                <p>Hey we have received request for reset your account password on ${currentDate}</p> 
                <h1>Please use the following Link to reset your account password . Link will be get deactivated after 15 minute</h1>
                <p>Click <a href=${process.env.CLIENT_URL}/resetpassword/${token}>here</a> to reset your password</p>
                <hr />
                <p>This email may containe sensetive information</p>`,
      };
      // <a>${process.env.CLIENT_URL}/resetpassword/${token}</a>

      // update resetlink feild in userModel and then send the reset link

      user.resetLink = token;
      await user.save();

      transporter.sendMail(data, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Reset Link sent to: ${user.email}`);
        }
      });

      return res.send(`Reset Link sent to: ${email}`);
    } catch (error) {
      return res.status(400).send({
        error: error.message,
      });
    }
  }
);

router.put(
  '/reset-password',
  [
    check('newPassword')
      .isLength({ min: 8, max: 20 })
      .withMessage('Required min 8 characters')
      .custom((value) => {
        let pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (pattern.test(value)) {
          return true;
        }
      })
      .withMessage(
        'min 8 characters which contain at least one numeric digit and a special character'
      ),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          error: errors.array()[0].msg,
        });
      }

      const { newPassword, resetLink } = req.body;

      User.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).send({
            message: `User not found with this token`,
          });
        }

        // console.log(user);

        user.password = newPassword;
        user.resetLink = '';
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }

          return res.send({
            message: 'Your password has been changed',
          });
        });
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
);

module.exports = router;
