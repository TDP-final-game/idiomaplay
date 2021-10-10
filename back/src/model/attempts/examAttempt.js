const mongoose = require('mongoose');

const examInfo = require('../exams/examInfo');
const {schema: ExerciseAttempt} = require('./exerciseAttempt');
const errors = require('./errors');
const Status = require('./status')

/*
 * Schema
 */
const ExamAttempt = new mongoose.Schema({
    _id: false,
    ...examInfo,
    exercisesAttempts: [{type: ExerciseAttempt, required: false}],
}, {autoCreate: false, toObject: {virtuals: true}, toJSON: {virtuals: true}});

/*
 * Instance methods
 */
ExamAttempt.virtual('status').get(function () {
    if(!this.exercisesAttempts || this.exercisesAttempts.length === 0) return Status.PENDING()
    if(this.exercisesAttempts.every(exercise => exercise.isPassed())) return Status.PASSED()
    if(this.exercisesAttempts.every(exercise => exercise.isCompleted())) return Status.FAILED()
    return Status.IN_PROGRESS();
})

Status.AddMethodsToSchema(ExamAttempt)

ExamAttempt.methods.unitAttempt = function () {
    return this.parent()
}

ExamAttempt.methods.attempt = function () {
    const {challenge} = this.ownerDocument()
    const {exam} = challenge.getUnit(this.unitAttempt().orderNumber)

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
