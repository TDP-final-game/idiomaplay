const mongoose = require('mongoose');

const UnitInfo = require('./unitInfo');
const {schema: Lesson} = require('../lessons/lesson');
const {schema: Exam} = require('../exams/exam');
const {model: UnitAttempt} = require('../attempts/unitAttempt');

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

/*
 * Exports
 */
module.exports = {
  schema: Unit
};
