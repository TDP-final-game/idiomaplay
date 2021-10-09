const mongoose = require('mongoose');
const UnitInfo = require('./unitInfo');
const Lesson = require('../lessons/lesson');
const Exam = require('../exams/exam');

const Unit = new mongoose.Schema({
  _id: false,
  unitInfo: {
    type: UnitInfo,
    required: [true, 'UnitInfo is required']
  },
  exam: {type: Exam, required: false},
  lessons: [{type: Lesson, required: false}]
});

module.exports = Unit;
