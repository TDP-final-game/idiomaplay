const mongoose = require('mongoose');
const Challenge = require('../challenge');
const UserUnit = require('./userUnit');

const UserChallenge = new mongoose.Schema({
  challenge: {
    type: Challenge,
    required: [true, 'challenge is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  userUnits: [{type: UserUnit, required: false}]
});


module.exports = UserChallenge;
