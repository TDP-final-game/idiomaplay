const mongoose = require('mongoose');
const UnitAttempt = require('./unitAttempt');
const STATUSES = require("../../constants/statuses.json");

const ChallengeAttempt = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
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
