const mongoose = require('mongoose');
const Unit = require('../unit');
const LessonAttempt = require('./lessonAttempt');
const ExamAttempt = require('./examAttempt');

const STATUSES = require('../../../constants/statuses');

const UnitAttempt = new mongoose.Schema({
    unit: {
        type: Unit,
        required: [true, 'unit is required']
    },
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    lessonsAttempts: [{type: LessonAttempt, required: false}],
    examsAttempts: {type: ExamAttempt, required: false},
    status: {
        type: String,
        enum: Object.keys(STATUSES),
        required: [true, 'status is required']
    }
});

module.exports = UnitAttempt;
