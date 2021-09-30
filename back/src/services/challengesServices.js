const Challenge = require('../model/domain/challenge');
const mongoose = require('mongoose');

const findChallenge = challangeId => {
	const challangeModel = mongoose.model('challange', Challenge);
	return  challangeModel.findOne({ _id: challangeId });
};

const createChallenge = challange => {
	const challangeModel = mongoose.model('challange', Challenge);
	return challangeModel.create(challange);
};

const addUnit = async (challangeId, unit) => {
	const challangeModel = mongoose.model('challange', Challenge);
	const challange = await challangeModel.findOne({ _id: challangeId });
	challange.units.push(unit);
	return challange.save();
};

const addLesson = async (challangeId, unitId, lesson) => {
	const challangeModel = mongoose.model('challange', Challenge);
	const challange = await challangeModel.findOne({ _id: challangeId });
	const unit = challange.units.find(unitToUpdate => unitToUpdate.orderNumber == unitId);
	unit.lessons.push(lesson);
	return challange.save();
};

const addExam = async (challangeId, unitId, exam) => {
	const challangeModel = mongoose.model('challange', Challenge);
	const challange = await challangeModel.findOne({ _id: challangeId });
	const unit = challange.units.find(unitToUpdate => unitToUpdate.orderNumber === unitId);
	unit.exam = exam;
	return challange.save();
};

const addExerciseToLesson = async (challangeId, unitId, lessonId, exercise) => {
	const challangeModel = mongoose.model('challange', Challenge);
	const challange = await challangeModel.findOne({ _id: challangeId });
	const unit = challange.units.find(unit => unit.orderNumber === unitId);
	const lesson = unit.lessons.find(lesson => lesson.orderNumber === lessonId);
	lesson.exercises.push(exercise);
	return challange.save();
};

const addExerciseToExam = async (challangeId, unitId, exercise) => {
	const challangeModel = mongoose.model('challange', Challenge);
	const challange = await challangeModel.findOne({ _id: challangeId });
	const unit = challange.units.find(unit => unit.orderNumber === unitId);
	unit.exam.exercises.push(exercise);
	return challange.save();
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