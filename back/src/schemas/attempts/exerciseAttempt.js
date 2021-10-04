const mongoose = require('mongoose');
const exerciseTypes = require('../../constants/exerciseTypes');
const STATUSES = require('../../constants/statuses.json');

const ExerciseAttempt = new mongoose.Schema({
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
    _id: false,
    type: [{
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
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  }
});

module.exports = ExerciseAttempt;
