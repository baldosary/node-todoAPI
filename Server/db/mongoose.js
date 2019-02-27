var mongoose = require('mongoose');

//Set up the mongoose config:
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };