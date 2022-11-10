const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const candidatesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  parties: String,
  options: [optionSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Candidates', candidatesSchema);
