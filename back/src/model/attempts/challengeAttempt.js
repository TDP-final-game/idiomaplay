const mongoose = require('mongoose');

const challengeInfo = require('../challenges/challengeInfo');
const {schema: UnitAttempt} = require('./unitAttempt');
const STATUSES = require("../../constants/statuses.json");
const errors = require("./errors")

/*
 * Schema
 */
const ChallengeAttempt = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required']
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: [true, 'challengeId is required'],
    autopopulate: true
  },
  ...challengeInfo,
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: STATUSES.IN_PROGRESS
  },
  unitsAttempts: [{type: UnitAttempt, required: false}],
});
ChallengeAttempt.plugin(require('mongoose-autopopulate'));

/*
 * Static methods
 */
ChallengeAttempt.statics.anyInProgress = async function ({challengeId, userId}) {
  const attemptsInProgress = await this.find({challenge: challengeId, user: userId, status: STATUSES.IN_PROGRESS});
  return attemptsInProgress.length !== 0;
}

/*
 * Instance methods
 */
ChallengeAttempt.methods.isInProgress = function () {
  return this.status === STATUSES.IN_PROGRESS
}

// Units
ChallengeAttempt.methods.getUnitAttempt = function (unitOrderNumber) {
  const unit = this.unitsAttempts.find(unit => unit.orderNumber === unitOrderNumber);
  if (!unit) throw errors.UnitAttemptNotFound({unitOrderNumber})
  return unit
}

ChallengeAttempt.methods.attemptUnit = function ({unitOrderNumber}) {
  if (!this.isInProgress()) throw errors.ChallengeAttemptNotInProgress();

  const unitAttempt = this.getUnitAttempt(unitOrderNumber)
  unitAttempt.attempt()
}

// Lessons
ChallengeAttempt.methods.attemptLesson = async function ({unitOrderNumber, lessonOrderNumber}) {
  if (!this.isInProgress()) throw errors.ChallengeAttemptNotInProgress();
  await this.getUnitAttempt(unitOrderNumber).attemptLesson({lessonOrderNumber});
}

ChallengeAttempt.methods.attemptLessonExercise = async function ({unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer}) {
  if (!this.isInProgress()) throw errors.ChallengeAttemptNotInProgress();
  await this.getUnitAttempt(unitOrderNumber).attemptLessonExercise({lessonOrderNumber, exerciseOrderNumber, answer});
}

// Exams
ChallengeAttempt.methods.attemptExam = async function ({unitOrderNumber}) {
  if (!this.isInProgress()) throw errors.ChallengeAttemptNotInProgress();
  await this.getUnitAttempt(unitOrderNumber).attemptExam();
}

ChallengeAttempt.methods.attemptExamExercise = async function ({unitOrderNumber, exerciseOrderNumber, answer}) {
  if (!this.isInProgress()) throw errors.ChallengeAttemptNotInProgress();
  await this.getUnitAttempt(unitOrderNumber).attemptExamExercise({exerciseOrderNumber, answer});
}

/*
 * Exports
 */
module.exports = {
  schema: ChallengeAttempt,
  model: mongoose.model('ChallengeAttempt', ChallengeAttempt)
};
