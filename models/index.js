const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = Promise;

const url = 'mongodb://localhost/ecomerce';

mongoose.connect(url,  {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports.User = require('./user');
module.exports.Post = require('./post');

