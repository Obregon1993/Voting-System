const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/voting-system');

module.exports.User = require('./user');
module.exports.Candidates = require('./candidates');

//const Schema = mongoose.Schema;
