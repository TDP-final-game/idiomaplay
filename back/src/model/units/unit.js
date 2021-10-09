const mongoose = require('mongoose');

const UnitInfo = require('./unitInfo');
const {schema: Lesson} = require('../lessons/lesson');
const {schema: Exam} = require('../exams/exam');
const {model: UnitAttempt} = require('../attempts/unitAttempt');
const errors = require('./errors')

/*
 * Schema
 */
const Unit = new mongoose.Schema({
  _id: false,
  unitInfo: {
    type: UnitInfo,
    required: [true, 'UnitInfo is required']
  },
  exam: {type: Exam, required: false},
  lessons: [{type: Lesson, required: false}]
});

/*
 * Instance methods
 */
Unit.methods.newAttempt = function () {
  return new UnitAttempt({
    unitInfo: this.unitInfo,
  });
}

Unit.methods.getLesson = function (lessonOrderNumber) {
  const lesson = this.lessons.find(lesson => lesson.lessonInfo.orderNumber === lessonOrderNumber);
  if (!lesson) throw errors.LessonNotFound({lessonOrderNumber})
  return lesson
}

/*
 * Exports
 */
module.exports = {
  schema: Unit
};
