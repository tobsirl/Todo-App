import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator/check';
import 'dotenv/config';

import auth from '../../middleware/auth';
import User from '../../models/User';

const router = express.Router();

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get('/test', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/auth/
// @desc    Authenticate a User and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email')
      .isEmail()
      .normalizeEmail({ all_lowercase: true }),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // destructoring from req.body

    try {
      // check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid Credentials' }] });
      }

      // checking if the passwords match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid Credentials' }] });
      }

      // Return JSON web token
      const payload = {
        user: {
          id: user.id
        }
      };

      const { JWTSECRET } = process.env;

      // TODO change the expiresIn for production
      jwt.sign(payload, JWTSECRET, { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

export default router;
