const Challenge = require('../schemas/challenges/challenge');
const mongoose = require('mongoose');
const {pageSize} = require('../constants/pagination_default.json');

const challengeModel = mongoose.model('challenge', Challenge);

const findChallenge = challengeId => {
	return challengeModel.findOne({ _id: challengeId });
};

const listChallenges = async ({pageNumber}) => {
	return challengeModel.find({}).skip(pageNumber * pageSize).limit(pageSize);
}

const deleteChallenges = () => {
	return challengeModel.deleteMany();
}

const createChallenge = challenge => {
	return challengeModel.create(challenge);
};

const addUnit = async (challengeId, unit) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	challenge.units.push(unit);
	return challenge.save();
};

const addLesson = async (challengeId, unitId, lesson) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber == unitId);
	unit.lessons.push(lesson);
	return challenge.save();
};

const addExam = async (challengeId, unitId, exam) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate.orderNumber === unitId);
	unit.exam = exam;
	return challenge.save();
};

const addExerciseToLesson = async (challengeId, unitId, lessonId, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit.orderNumber === unitId);
	const lesson = unit.lessons.find(lesson => lesson.orderNumber === lessonId);
	lesson.exercises.push(exercise);
	return challenge.save();
};

const addExerciseToExam = async (challengeId, unitId, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit.orderNumber === unitId);
	unit.exam.exercises.push(exercise);
	return challenge.save();
};


module.exports = { 
	findChallenge,
	listChallenges,
	createChallenge,
	addUnit,
	addLesson,
	addExam,
	addExerciseToLesson,
	addExerciseToExam,
	deleteChallenges
};
