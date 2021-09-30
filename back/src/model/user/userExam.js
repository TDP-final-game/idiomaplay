const mongoose = require('mongoose');
const Exam = require('../domain/exam');
const UserExercise = require('./userExercise');
const STATUSES = require('../../utils/statuses');

const UserExam = new mongoose.Schema({
	_id: false,
	exam: {
		type: Exam,
		required: [true, 'exam is required']
	},
	userId: {
		type: String,
		required: [true, 'userId is required']
	},
    userExercises: [{ type: UserExercise, required: false}],
    status: {
        type: String,
        enum : Object.keys(STATUSES),
        required: [true, 'status is required']   
    }
});

module.exports = UserExam;