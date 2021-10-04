const mongoose = require('mongoose');
const ChallengeInfo = require('../challenges/challengeInfo');
const UnitAttempt = require('./unitAttempt');
const STATUSES = require("../../constants/statuses.json");

const ChallengeAttempt = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required']
  },
  challengeInfo: {
    type: ChallengeInfo,
    required: [true, 'challengeInfo is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: STATUSES.IN_PROGRESS // todo: start challenge attempt as 'in progress'?
  },
  unitsAttempts: [{type: UnitAttempt, required: false}],
});


module.exports = ChallengeAttempt;
