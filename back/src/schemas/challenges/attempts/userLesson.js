const mongoose = require('mongoose');
const Lesson = require('../lesson');
const UserExercise = require('./userExercise');
const STATUSES = require('../../../constants/statuses');

const UserLesson = new mongoose.Schema({
  _id: false,
  lesson: {
    type: Lesson,
    required: [true, 'unit is required']
  },
  userId: {
    type: String,
    required: [true, 'userId is required']
  },
  userExercises: [{type: UserExercise, required: false}],
  status: {
    type: String,
    enum: Object.keys(STATUSES),
    required: [true, 'status is required']
  }
});

module.exports = UserLesson;
