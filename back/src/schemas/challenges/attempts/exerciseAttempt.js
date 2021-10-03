const mongoose = require('mongoose');
const Exercise = require('../exercise');
const STATUSES = require('../../../constants/statuses');

const ExerciseAttempt = new mongoose.Schema({
    exercise: {
        type: Exercise,
        required: [true, 'exercise is required']
    },
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    status: {
        type: String,
        enum: Object.keys(STATUSES),
        required: [true, 'status is required']
    }
});

module.exports = ExerciseAttempt;
