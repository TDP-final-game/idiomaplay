const mongoose = require('mongoose');

const errors = require('./errors')
const STATUSES = require('../../constants/statuses.json');
const exerciseInfo = require('../exercises/exerciseInfo');

/*
 * Schema
 */
const ExerciseAttempt = new mongoose.Schema({
  ...exerciseInfo,
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

ExerciseAttempt.methods.validAnswer = function (answer) {
  return this.options.some(option => option.text === answer)
}

ExerciseAttempt.methods.correctOption = function () {
  return this.options.find(option => option.correct === true)
}

ExerciseAttempt.methods.correctAnswer = function (answer) {
  if(!this.validAnswer(answer)) throw errors.AnswerNotFound({answer})
  return answer === this.correctOption().text
}

ExerciseAttempt.methods.attempt = function ({answer}) {
  if(!this.isPending()) throw errors.ExerciseNotPending()
  this.status = this.correctAnswer(answer) ? STATUSES.PASSED : STATUSES.FAILED;
  this.optionAnswered = answer
}

/*
 * Exports
 */
module.exports = {
  schema: ExerciseAttempt,
  model: mongoose.model('ExerciseAttempt', ExerciseAttempt)
};
