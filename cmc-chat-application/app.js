/* eslint linebreak-style: ["error", "windows"] */

import bodyParser from 'body-parser';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import mongoose from 'mongoose';
import config from './global';
import { applyPassportStrategy } from './passport';
import {
  usersController,
  messagesController,
  dashboardController,
  signupController,
  loginController,
  roomsController,
  identityController
} from './controllers';

const app = express();

// Set up view engine

app.set('view engine', 'ejs');

// Set up bodyParser

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Set up public folder for serving static files

app.use(express.static('public'));

// Set up session
app.use(session({
  secret: 'cmc nodejs training',
}));

app.use(flash());

// Set up morgan for logging

// app.use(logger('combined'));

/**
  Index Entry Point
 */
app.get('/', (req, res) => {
  res.render('index');
});

// Set up controller
app.use('/users', usersController);
app.use('/messages', messagesController);
app.use('/dashboard', dashboardController);
app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/rooms', roomsController);
app.use('/identity', identityController);
// const { port, mongoDBUri } = config.env.dev;
app.listen(8000, () => {
  mongoose.connect('mongodb://localhost/test').then(() => {
    console.log('Connected to mongoDB at port 27017');
  });
});
