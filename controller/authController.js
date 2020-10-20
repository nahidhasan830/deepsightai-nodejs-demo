const User = require('../models/userModel');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('../config/passportConfig');

exports.dashboard = (req, res) => {
  if (req.isAuthenticated()) {
    res.render('dashboard');
    console.log(req.user);
  } else {
    res.redirect('/login');
  }
};

exports.getGoogle = passport.authenticate('google', { scope: ['profile'] });

exports.getGoogleCb = passport.authenticate('google', {
  scope: 'https://www.googleapis.com/auth/plus.login',
  successRedirect: '/dashboard',
  failureRedirect: '/user/login',
});

exports.getLogOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/dashboard');
      });
    }
  });
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/user/register');
    }

    req.login(user, (err) => {
      if (err) throw err;
      return res.redirect('/dashboard');
    });
  });
};
