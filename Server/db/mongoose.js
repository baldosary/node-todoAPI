var mongoose = require('mongoose');

//Set up the mongoose config:
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };