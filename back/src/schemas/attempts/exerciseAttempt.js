const mongoose = require('mongoose');
const Exercise = require('../exercises/exercise');
const STATUSES = require('../../constants/statuses.json');

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
    required: [true, 'status is required']
  }
});

module.exports = ExerciseAttempt;
