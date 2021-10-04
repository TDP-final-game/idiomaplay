const mongoose = require('mongoose');
const UnitInfo = require('../units/unitInfo');
const LessonAttempt = require('./lessonAttempt');
const ExamAttempt = require('./examAttempt');

const STATUSES = require('../../constants/statuses.json');

const UnitAttempt = new mongoose.Schema({
  _id: false,
  unitInfo: {
    type: UnitInfo,
    required: [true, 'unitInfo is required']
  },
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: STATUSES.IN_PROGRESS
  },
  lessonsAttempts: [{type: LessonAttempt, required: false}],
  examsAttempts: {type: ExamAttempt, required: false},
});

module.exports = UnitAttempt;
