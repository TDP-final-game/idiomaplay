const mongoose = require('mongoose');

const UnitInfo = require('../units/unitInfo');
const {schema: LessonAttempt} = require('./lessonAttempt');
const {schema: ExamAttempt} = require('./examAttempt');
const STATUSES = require('../../constants/statuses.json');
const errors = require('./errors');

/*
 * Schema
 */
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
}, {autoCreate: false});

/*
 * Instance methods
 */
UnitAttempt.methods.isInProgress = function () {
  return this.status === STATUSES.IN_PROGRESS
}

UnitAttempt.methods.attempt = function () {
  const {challenge} = this.ownerDocument()
  const {lessons, exam} = challenge.getUnit(this.unitInfo.orderNumber)

  this.status = STATUSES.IN_PROGRESS
  this.lessonsAttempts = lessons.map(lesson => lesson.newAttempt())
  this.examAttempt = exam.newAttempt()
}

UnitAttempt.methods.allLessonsArePassed = function () {
  return this.lessonsAttempts.every(lessonAttempt => lessonAttempt.status === STATUSES.PASSED)
}

UnitAttempt.methods.attemptExam = function () {
  if(!this.isInProgress()) throw errors.UnitAttemptNotInProgress();
  if(!this.allLessonsArePassed()) throw errors.ExamAttemptWithUnfinishedLessons();
  this.examAttempt.attempt()
}

/*
 * Exports
 */
module.exports = {
  schema: UnitAttempt,
  model: mongoose.model('UnitAttempt', UnitAttempt)
};
