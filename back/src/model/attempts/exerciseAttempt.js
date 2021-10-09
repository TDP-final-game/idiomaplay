const mongoose = require('mongoose');

const {schema: Exercise} = require('../exercises/exercise');
const errors = require('./errors')
const STATUSES = require('../../constants/statuses.json');

/*
 * Schema
 */
const ExerciseAttempt = new mongoose.Schema({
  _id: false,
  exercise: {
    type: Exercise,
    required: [true, 'exercise is required']
  },
  optionAnswered: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: STATUSES.PENDING
  }
}, {autoCreate: false});

/*
 * Instance methods
 */
ExerciseAttempt.methods.isPending = function () {
  return this.status === STATUSES.PENDING
}

ExerciseAttempt.methods.attempt = function ({answer}) {
  if(!this.isPending()) throw errors.ExerciseNotPending()
  this.status = this.exercise.correctAnswer(answer) ? STATUSES.PASSED : STATUSES.FAILED;
  this.optionAnswered = answer
}

/*
 * Exports
 */
module.exports = {
  schema: ExerciseAttempt,
  model: mongoose.model('ExerciseAttempt', ExerciseAttempt)
};
