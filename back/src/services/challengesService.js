const Challenge = require('../model/domain/challenge');
const mongoose = require('mongoose');

const findChallenge = challengeId => {
	const challengeModel = mongoose.model('challenge', Challenge);
	return  challengeModel.findOne({ _id: challengeId });
};

const createChallenge = challenge => {
	const challengeModel = mongoose.model('challenge', Challenge);
	return challengeModel.create(challenge);
};

const addUnit = async (challengeId, unit) => {
	const challengeModel = mongoose.model('challenge', Challenge);
	const challenge = await challengeModel.findOne({ _id: challengeId });
	challenge.units.push(unit);
	return challenge.save();
};

const addLesson = async (challengeId, unitId, lesson) => {
	const challengeModel = mongoose.model('challenge', Challenge);
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber == unitId);
	unit.lessons.push(lesson);
	return challenge.save();
};

const addExam = async (challengeId, unitId, exam) => {
	const challengeModel = mongoose.model('challenge', Challenge);
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber === unitId);
	unit.exam = exam;
	return challenge.save();
};

const addExerciseToLesson = async (challengeId, unitId, lessonId, exercise) => {
	const challengeModel = mongoose.model('challenge', Challenge);
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit.orderNumber === unitId);
	const lesson = unit.lessons.find(lesson => lesson.orderNumber === lessonId);
	lesson.exercises.push(exercise);
	return challenge.save();
};

const addExerciseToExam = async (challengeId, unitId, exercise) => {
	const challengeModel = mongoose.model('challenge', Challenge);
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit.orderNumber === unitId);
	unit.exam.exercises.push(exercise);
	return challenge.save();
};


module.exports = { 
	findChallenge,
	createChallenge,
	addUnit,
	addLesson,
	addExam,
	addExerciseToLesson,
	addExerciseToExam
};