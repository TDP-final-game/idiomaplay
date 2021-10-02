const mongoose = require('mongoose');
const Exercise = require('../exercise');
const STATUSES = require('../../../constants/statuses');

const UserExercise = new mongoose.Schema({
  exercise: {
    type: Exercise,
    required: [true, 'exam is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  }
});

module.exports = UserExercise;
