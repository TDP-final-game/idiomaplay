const mongoose = require('mongoose');
const LessonInfo = require('./lessonInfo');
const {schema: Exercise} = require('../exercises/exercise');

const Lesson = new mongoose.Schema({
  _id: false,
  lessonInfo: {
    type: LessonInfo,
    required: [true, 'Lesson Info is required']
  },
  exercises: [{type: Exercise, required: false}],
});

module.exports = {
  schema: Lesson
};
