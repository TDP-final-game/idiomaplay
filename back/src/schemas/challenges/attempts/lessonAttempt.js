const mongoose = require('mongoose');
const ExerciseAttempt = require('./exerciseAttempt');
const STATUSES = require('../../../constants/statuses');

const LessonAttempt = new mongoose.Schema({
  _id: false,
  name: {
    type: String,
    required: [true, 'name is required']
  },
  description: {
    type: String,
    required: [true, 'difficulty is required']
  },
  orderNumber: {
    type: Number,
    required: [true, 'orderNumber is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  },
  exercisesAttempts: [{type: ExerciseAttempt, required: false}],
});

module.exports = LessonAttempt;
