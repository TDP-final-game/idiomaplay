'use strict';

const { model: challengeModel } = require('../../model/challenges/challenge');
const { model: challengeAttemptModel } = require('../../model/attempts/challengeAttempt');
const { model: userModel } = require('../../model/users/user');
const STATUSES = require('../../constants/statuses.json');

const errors = require('./challengeAttemptErrors');

const attemptChallenge = async (challengeId, userId) => {

	if(await challengeAttemptModel.anyInProgress({ challengeId, userId }))
		throw errors.ChallengeInProgress();

	const challenge = await challengeModel.findOne({ _id: challengeId });
	if(!challenge)
		throw errors.ChallengeNotFound();

	const attempt = challenge.newAttempt();
	attempt.user = await userModel.findOne({ _id: userId });

	return attempt.save();
};

const attemptUnit = async (challengeAttemptId, unitOrderNumber) => {
	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();
	await challengeAttempt.attemptUnit({ unitOrderNumber });
	return (await challengeAttempt.save()).getUnitAttempt(unitOrderNumber);
};


const lifesCheck = async challengeAttempt => {
	const user = await userModel.findOne({ _id: challengeAttempt.user });

	const userChallengeAttempts = await challengeAttemptModel.find({ user: user._id, status: STATUSES.IN_PROGRESS });
	let lessonsInProgress = 0;
	userChallengeAttempts.forEach(attempt => {
		attempt.unitsAttempts.forEach(unitAttempt => {
			lessonsInProgress += unitAttempt.lessonsAttempts.filter(lessonAttempt => lessonAttempt.status.status === STATUSES.IN_PROGRESS).length;
		});
	});

	if(lessonsInProgress >= user.stats.lives)
		throw errors.NotEnoughLives();
};

const attemptExam = async (challengeAttemptId, unitOrderNumber) => {
	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();

	await lifesCheck(challengeAttempt);

	await challengeAttempt.attemptExam({ unitOrderNumber });
	return (await challengeAttempt.save()).getUnitAttempt(unitOrderNumber).examAttempt;
};

const attemptLesson = async (challengeAttemptId, unitOrderNumber, lessonOrderNumber) => {

	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();

	await lifesCheck(challengeAttempt);

	await challengeAttempt.attemptLesson({ unitOrderNumber, lessonOrderNumber });
	return (await challengeAttempt.save()).getUnitAttempt(unitOrderNumber).getLessonAttempt(lessonOrderNumber);
};

const attemptExamExercise = async (challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) => {
	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();

	await challengeAttempt.attemptExamExercise({ unitOrderNumber, exerciseOrderNumber, answer });
	return (await challengeAttempt.save()).getUnitAttempt(unitOrderNumber).examAttempt.getExercise(exerciseOrderNumber);
};

const attemptLessonExercise = async (challengeAttemptId, unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer) => {
	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();

	await challengeAttempt.attemptLessonExercise({ unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer });
	return (await challengeAttempt.save()).getUnitAttempt(unitOrderNumber).getLessonAttempt(lessonOrderNumber)
		.getExercise(exerciseOrderNumber);
};

const getChallenge = async challengeAttemptId => {
	const challengeAttempt = await challengeAttemptModel.findOne({ _id: challengeAttemptId });
	if(!challengeAttempt)
		throw errors.ChallengeAttemptNotFound();
	return challengeAttempt;
};

module.exports = {
	attemptChallenge,
	attemptUnit,
	attemptExam,
	attemptLesson,
	attemptExamExercise,
	attemptLessonExercise,
	getChallenge
};
