const mongoose = require('mongoose');

const exerciseTypes = require('../../constants/exerciseTypes');
const STATUSES = require('../../constants/statuses.json');

/*
 * Schema
 */
const Exercise = new mongoose.Schema({
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

/*
 * Exports
 */
module.exports = {
  schema: Exercise
};
