const mongoose = require('mongoose');

const examInfo = require('../exams/examInfo');
const {schema: ExerciseAttempt} = require('./exerciseAttempt');
const STATUSES = require('../../constants/statuses.json');
const errors = require('./errors');

/*
 * Schema
 */
const ExamAttempt = new mongoose.Schema({
    _id: false,
    ...examInfo,
    exercisesAttempts: [{type: ExerciseAttempt, required: false}],
    status: {
        type: String,
        enum: Object.keys(STATUSES),
        required: [true, 'status is required'],
        default: STATUSES.IN_PROGRESS
    }
}, {autoCreate: false});

/*
 * Instance methods
 */
ExamAttempt.methods.unitAttempt = function () {
    return this.parent()
}

ExamAttempt.methods.attempt = function () {
    const {challenge} = this.ownerDocument()
    const {exam} = challenge.getUnit(this.unitAttempt().orderNumber)

    this.status = STATUSES.IN_PROGRESS
    this.exercisesAttempts = exam.exercises.map(exercise => exercise.newAttempt());
}

ExamAttempt.methods.getExercise = function (exerciseOrderNumber) {
    const exercise = this.exercisesAttempts[exerciseOrderNumber];
    if (!exercise) throw errors.ExerciseAttemptNotFound({exerciseOrderNumber})
    return exercise
}

ExamAttempt.methods.attemptExercise = function ({exerciseOrderNumber, answer}) {
    const exercise = this.getExercise(exerciseOrderNumber);
    exercise.attempt({answer})
}

/*
 * Exports
 */
module.exports = {
    schema: ExamAttempt,
    model: mongoose.model('ExamAttempt', ExamAttempt)
};
