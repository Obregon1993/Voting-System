const mongoose = require('mongoose');
const candidates = require('./candidates');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidates' }],
});

module.exports = mongoose.model('User', userSchema);
