const mongoose = require('mongoose');

const exerciseInfo = require('./exerciseInfo');
const STATUSES = require('../../constants/statuses.json');
const errors = require('./errors');
const {model: ExerciseAttempt} = require('../attempts/exerciseAttempt')

/*
 * Schema
 */
const Exercise = new mongoose.Schema(exerciseInfo);

/*
 * Instance methods
 */
Exercise.methods.newAttempt = function () {
  return new ExerciseAttempt({
    ...this.toObject(),
    status: STATUSES.PENDING
  })
}

Exercise.methods.validAnswer = function (answer) {
  return this.options.some(option => option.text === answer)
}

Exercise.methods.correctOption = function () {
  return this.options.find(option => option.correct === true)
}

Exercise.methods.correctAnswer = function (answer) {
  if(!this.validAnswer(answer)) throw errors.AnswerNotFound({answer})
  return answer === this.correctOption().text
}

/*
 * Exports
 */
module.exports = {
  schema: Exercise
};
