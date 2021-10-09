const mongoose = require('mongoose');

const LessonInfo = require('./lessonInfo');
const {schema: Exercise} = require('../exercises/exercise');
const {model: LessonAttempt} = require('../attempts/lessonAttempt');

/*
 * Schema
 */
const Lesson = new mongoose.Schema({
  _id: false,
  lessonInfo: {
    type: LessonInfo,
    required: [true, 'Lesson Info is required']
  },
  exercises: [{type: Exercise, required: false}],
});

/*
 * Instance methods
 */
Lesson.methods.newAttempt = function () {
  return new LessonAttempt({
    lessonInfo: this.lessonInfo
  })
}

/*
 * Exports
 */
module.exports = {
  schema: Lesson
};
