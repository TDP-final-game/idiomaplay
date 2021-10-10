const mongoose = require('mongoose');

const exerciseInfo = require('./exerciseInfo');
const STATUSES = require('../../constants/statuses.json');
const {model: ExerciseAttempt} = require('../attempts/exerciseAttempt')

/*
 * Schema
 */
const Exercise = new mongoose.Schema(exerciseInfo);

/*
 * Instance methods
 */
Exercise.methods.newAttempt = function () {
  return new ExerciseAttempt({
    ...this.toObject(),
    status: STATUSES.PENDING
  })
}

/*
 * Exports
 */
module.exports = {
  schema: Exercise
};
