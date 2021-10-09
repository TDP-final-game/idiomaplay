const mongoose = require('mongoose');
const LessonInfo = require('../lessons/lessonInfo');
const {schema: ExerciseAttempt} = require('./exerciseAttempt');
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
    required: [true, 'status is required'],
    default: STATUSES.PENDING
  },
  exercisesAttempts: [{type: ExerciseAttempt, required: false}],
});

module.exports = {
  schema: LessonAttempt
};
