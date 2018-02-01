
import express from 'express';
import { validatePassword, generatehashedPassword } from '../helper';
import { User } from '../db/models/index';

import { errors, underscoreId } from './../global';

const loginController = express.Router();

/**
 * entry point: /login
 * method: GET
 */
loginController.get('/', (req, res) => {
  res.render('login', { error: req.flash('error') || null });
});

loginController.post('/', async (req, res) => {
  console.log('login controller', req.body);
  const { username, password } = req.body;
  if (!username || !password || !validatePassword(password)) {
    req.flash('error', errors.BadRequest.message);
  } else {
    try {
      const user = await User.findOne({ username }).lean().exec();
      console.log("db pass: ", user.hashedPassword);
      console.log("input pass: ", generatehashedPassword(password));
      if (!user) {
        req.flash('error', errors.UserDoesNotExist.message);
      } else if (user.hashedPassword !== generatehashedPassword(password)) {
        req.flash('error', errors.WrongPassword.message);
      } else {
        req.session.username = username;
        req.session.userId = user[underscoreId];
        res.redirect('/dashboard');
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: 'Internal server error',
        error,
      });
    }
  }
  res.redirect('/login');
});

export default loginController;
