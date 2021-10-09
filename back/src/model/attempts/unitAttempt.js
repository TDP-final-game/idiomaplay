const mongoose = require('mongoose');
const UnitInfo = require('../units/unitInfo');
const {schema: LessonAttempt} = require('./lessonAttempt');
const {schema: ExamAttempt} = require('./examAttempt');

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
    default: STATUSES.PENDING
  },
  lessonsAttempts: [{type: LessonAttempt, required: false}],
  examAttempt: {type: ExamAttempt, required: false},
});

module.exports = {
  schema: UnitAttempt
};
