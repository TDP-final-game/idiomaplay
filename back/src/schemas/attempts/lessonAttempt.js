const mongoose = require('mongoose');
const LessonInfo = require('../lessons/lessonInfo');
const ExerciseAttempt = require('./exerciseAttempt');
const STATUSES = require('../../constants/statuses.json');

const LessonAttempt = new mongoose.Schema({
  _id: false,
  lessonInfo: {
    type: LessonInfo,
    required: [true, 'lessonInfo is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  },
  exercisesAttempts: [{type: ExerciseAttempt, required: false}],
});

module.exports = LessonAttempt;