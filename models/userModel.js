const mongoose = require('mongoose');
require('mongoose-type-email');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  username: String,
  email: mongoose.SchemaTypes.Email,
  password: String,
  googleId: {
    type: String,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = User;
