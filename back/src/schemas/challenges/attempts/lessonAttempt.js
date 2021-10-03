const mongoose = require('mongoose');
const Lesson = require('../lesson');
const ExerciseAttempt = require('./exerciseAttempt');
const STATUSES = require('../../../constants/statuses');

const LessonAttempt = new mongoose.Schema({
    lesson: {
        type: Lesson,
        required: [true, 'lesson is required']
    },
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    exercisesAttempts: [{type: ExerciseAttempt, required: false}],
    status: {
        type: String,
        enum: Object.keys(STATUSES),
        required: [true, 'status is required']
    }
});

module.exports = LessonAttempt;
