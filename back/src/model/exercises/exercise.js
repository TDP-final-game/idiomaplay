const mongoose = require('mongoose');

const exerciseTypes = require('../../constants/exerciseTypes');
const STATUSES = require('../../constants/statuses.json');
const errors = require('./errors');

/*
 * Schema
 */
const Exercise = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    enum: Object.values(exerciseTypes),
    required: [true, 'type is required']
  },
  statement: {
    type: String,
    required: true
  },
  options: {
    type: [{
      _id: false,
      text: {
        type: String,
        required: true
      },
      correct: {
        type: Boolean,
        required: true
      }
    }],
    required: [true, 'options is required']
  }
});

/*
 * Instance methods
 */
Exercise.methods.newAttempt = function () {
  // This is to avoid importing the ExerciseAttempt model and therefore
  // generate a circular dependency. In the future better solutions could be
  // found.
  return new (mongoose.model('ExerciseAttempt'))({
    exercise: this,
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
