const mongoose = require('mongoose');

const lessonInfo = require('../lessons/lessonInfo');
const {schema: ExerciseAttempt} = require('./exerciseAttempt');
const errors = require('./errors');
const STATUSES = require('../../constants/statuses.json');

/*
 * Schema
 */
const LessonAttempt = new mongoose.Schema({
  _id: false,
  ...lessonInfo,
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required'],
    default: STATUSES.PENDING
  },
  exercisesAttempts: [{type: ExerciseAttempt, required: false}],
}, {autoCreate: false});

/*
 * Instance methods
 */
LessonAttempt.methods.isPassed = function () {
  return this.status === STATUSES.PASSED
}

LessonAttempt.methods.unitAttempt = function () {
  return this.parent()
}

LessonAttempt.methods.attempt = function () {
  const {challenge} = this.ownerDocument()
  const unit = challenge.getUnit(this.unitAttempt().orderNumber)
  const lesson = unit.getLesson(this.orderNumber)

  this.status = STATUSES.IN_PROGRESS
  this.exercisesAttempts = lesson.exercises.map(exercise => exercise.newAttempt())
}

LessonAttempt.methods.getExercise = function (exerciseOrderNumber) {
  const exercise = this.exercisesAttempts[exerciseOrderNumber];
  if (!exercise) throw errors.ExerciseAttemptNotFound({exerciseOrderNumber})
  return exercise
}

LessonAttempt.methods.attemptExercise = function ({exerciseOrderNumber, answer}) {
  const exercise = this.getExercise(exerciseOrderNumber);
  exercise.attempt({answer})
  if(this.exercisesAttempts.some(exercise => exercise.isPending())) {
    return
  }
  if(this.exercisesAttempts.every(exercise => exercise.isPassed())) {
    this.status = STATUSES.PASSED
  } else {
    this.status = STATUSES.FAILED
  }
}

/*
 * Exports
 */
module.exports = {
  schema: LessonAttempt,
  model: mongoose.model('LessonAttempt', LessonAttempt)
};
