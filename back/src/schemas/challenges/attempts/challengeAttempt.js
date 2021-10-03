const mongoose = require('mongoose');
const Challenge = require('../challenge');
const UnitAttempt = require('./unitAttempt');
const STATUSES = require("../../../constants/statuses");

const ChallengeAttempt = new mongoose.Schema({
  challenge: {
    type: Challenge,
    required: [true, 'challenge is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  unitsAttempts: [{type: UnitAttempt, required: false}],
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: "IN_PROGRESS" // todo: start challenge attempt as 'in progress'?
  }
});


module.exports = ChallengeAttempt;
