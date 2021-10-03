const mongoose = require('mongoose');
const LessonAttempt = require('./lessonAttempt');
const ExamAttempt = require('./examAttempt');

const STATUSES = require('../../../constants/statuses');

const UnitAttempt = new mongoose.Schema({
  _id: false,
  orderNumber: {
    type: Number,
    required: [true, 'orderNumber is required']
  },
  name: {
    type: String,
    required: [true, 'name is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  },
  lessonsAttempts: [{type: LessonAttempt, required: false}],
  examsAttempts: {type: ExamAttempt, required: false},
});

module.exports = UnitAttempt;
