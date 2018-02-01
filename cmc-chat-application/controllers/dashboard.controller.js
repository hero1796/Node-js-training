import express from 'express';
import { User } from './../db/models';

const dashboardController = express.Router();

dashboardController.get('/', async (req, res) => {
  const users = await User.find().lean().exec();
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    res.render('dashboard', { username: req.session.username, users });
  }
});

export default dashboardController;
