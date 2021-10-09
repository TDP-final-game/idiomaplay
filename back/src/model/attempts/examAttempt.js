const mongoose = require('mongoose');
const ExamInfo = require('../exams/examInfo');
const {schema: ExerciseAttempt} = require('./exerciseAttempt');
const STATUSES = require('../../constants/statuses.json');

/*
 * Schema
 */
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
        required: [true, 'status is required'],
        default: STATUSES.IN_PROGRESS
    }
}, {autoCreate: false});

/*
 * Exports
 */
module.exports = {
    schema: ExamAttempt,
    model: mongoose.model('ExamAttempt', ExamAttempt)
};
