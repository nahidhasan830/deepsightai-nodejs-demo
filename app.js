require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');

const app = express();

//MIddlewares

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public/`));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//////--- Routes------////////
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('dashboard');
  } else {
    res.redirect('/user/login');
  }
});
//Auth Routes
app.use('/user', require('./routes/authRoutes'));
app.use('/auth/google', require('./routes/googleAuthRoutes'));

//User controller routes
app.use('/api/user', require('./routes/userRoutes'));

//////----Reading Dummy User Data from JSON File------////////
const data = fs.readFileSync(`${__dirname}/data/user-data.json`, 'utf-8');
// console.log(data)

module.exports = app;
