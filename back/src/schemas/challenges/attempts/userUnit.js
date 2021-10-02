const mongoose = require('mongoose');
const Unit = require('../unit');
const UserLesson = require('./userLesson');
const UserExam = require('./userExam');

const STATUSES = require('../../../constants/statuses');

const UserUnit = new mongoose.Schema({
  _id: false,
  unit: {
    type: Unit,
    required: [true, 'unit is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  userLessons: [{type: UserLesson, required: false}],
  userExam: {type: UserExam, required: false},
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  }
});

module.exports = UserUnit;
