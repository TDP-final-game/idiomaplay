const mongoose = require('mongoose');

const errors = require('./errors')
const exerciseInfo = require('../exercises/exerciseInfo');
const Status = require('./status')

/*
 * Schema
 */
const ExerciseAttempt = new mongoose.Schema({
  ...exerciseInfo,
  optionAnswered: {
    type: String,
    required: false
  }
}, {autoCreate: false, toObject: {virtuals: true}, toJSON: {virtuals: true}});

/*
 * Instance methods
 */
/**
 * Returns the status of the exercise.
 */
ExerciseAttempt.virtual('status').get(function () {
  if (!this.optionAnswered) return Status.PENDING()
  if (this.correctAnswer(this.optionAnswered)) return Status.PASSED()
  return Status.FAILED();
})

Status.AddMethodsToSchema(ExerciseAttempt)

/**
 * Returns true if the answer is a valid option, false otherwise.
 * @param {String} answer
 * @returns {boolean}
 */
ExerciseAttempt.methods.validAnswer = function (answer) {
  return this.options.some(option => option.text === answer)
}

/**
 * Returns the correct option.
 * @returns {Option}
 */
ExerciseAttempt.methods.correctOption = function () {
  return this.options.find(option => option.correct === true)
}

/**
 * Returns true if {answer} is correct, false otherwise.
 * @param {String} answer
 * @returns {boolean}
 */
ExerciseAttempt.methods.correctAnswer = function (answer) {
  if (!this.validAnswer(answer)) throw errors.AnswerNotFound({answer})
  return answer === this.correctOption().text
}

ExerciseAttempt.methods.attempt = function ({answer}) {
  if (!this.status.isPending()) throw errors.ExerciseNotPending()
  this.optionAnswered = answer
}

/*
 * Exports
 */
module.exports = {
  schema: ExerciseAttempt,
  model: mongoose.model('ExerciseAttempt', ExerciseAttempt)
};
