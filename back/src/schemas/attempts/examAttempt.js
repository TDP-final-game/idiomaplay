const mongoose = require('mongoose');
const ExamInfo = require('../exams/examInfo');
const ExerciseAttempt = require('./exerciseAttempt');
const STATUSES = require('../../constants/statuses.json');

const ExamAttempt = new mongoose.Schema({
    _id: false,
    examInfo: {
      type: ExamInfo,
      required: [true, 'examInfo is required']
    },
    exercisesAttempts: [{type: ExerciseAttempt, required: false}],
    status: {
        type: String,
        enum: Object.keys(STATUSES),
        required: [true, 'status is required']
    }
});

module.exports = ExamAttempt;
