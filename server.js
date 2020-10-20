require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connected!');
  });

  app.listen('3000', () => {
    console.log('server is started at localhost 3000');
  });