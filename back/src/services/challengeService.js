const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/challenges/attempts/challengeAttempt');
const mongoose = require('mongoose');
const {pageSize} = require('../constants/pagination_default.json');

const challengeModel = mongoose.model('challenge', Challenge);
const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

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
	const unit = challenge.units.find(unitToUpdate => unitToUpdate._id === unitId);
	unit.lessons.push(lesson);
	return challenge.save();
};

const addExam = async (challengeId, unitId, exam) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unitToUpdate => unitToUpdate._id === unitId);
	unit.exam = exam;
	return challenge.save();
};

const addExerciseToLesson = async (challengeId, unitId, lessonId, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit._id === unitId);
	const lesson = unit.lessons.find(lesson => lesson._id === lessonId);
	lesson.exercises.push(exercise);
	return challenge.save();
};

const addExerciseToExam = async (challengeId, unitId, exercise) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const unit = challenge.units.find(unit => unit._id === unitId);
	unit.exam.exercises.push(exercise);
	return challenge.save();
};

const startChallengeAttempt = async (challengeId, userId) => {
	const challenge = await challengeModel.findOne({ _id: challengeId });
	const challengeAttempt = {userId, challenge};
	return challengeAttemptModel.create(challengeAttempt);
};

const listChallengeAttempts = async (challengeId) => {
	const challengeAttempts = await challengeAttemptModel.find({"challenge._id": challengeId});
	return challengeAttempts;
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
	deleteChallenges,
	startChallengeAttempt,
	listChallengeAttempts
};
