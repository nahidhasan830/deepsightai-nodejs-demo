const User = require('../models/userModel');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/dashboard',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);
