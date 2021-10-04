const mongoose = require('mongoose');
const Exam = require('../exams/exam');
const ExerciseAttempt = require('./exerciseAttempt');
const STATUSES = require('../../constants/statuses.json');

const ExamAttempt = new mongoose.Schema({
    _id: false,
    exam: {
        type: Exam,
        required: [true, 'exam is required']
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

module.exports = ExamAttempt;
