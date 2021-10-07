const mongoose = require('mongoose');
const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');
const STATUSES = require("../constants/statuses");

const challengeModel = mongoose.model('challenge', Challenge);
const challengeAttemptModel = mongoose.model('challengeAttempt', ChallengeAttempt);

const findChallenge = challengeId => {
  return challengeModel.findOne({_id: challengeId});
};

const listChallenges = async ({pageNumber}) => {
  return challengeModel.find({}).skip(pageNumber * pageSize).limit(pageSize);
}

const deleteChallenges = () => {
  return challengeModel.deleteMany();
}

const createChallenge = async challengeData => {
  return challengeModel.create({
    challengeInfo: {
      name: challengeData.name,
      description: challengeData.description,
      difficulty: challengeData.difficulty
    }
  });
};

const addUnit = async (challengeId, unitData) => {
  const challenge = await challengeModel.findOne({_id: challengeId});

  challenge.units.push({
    unitInfo: {
      orderNumber: unitData.orderNumber,
      name: unitData.name,
      description: unitData.description
    }
  });
  return challenge.save();
};

const addLesson = async (challengeId, unitName, lessonData) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.name === unitName);
  unit.lessons.push({
    lessonInfo: {
      name: lessonData.name,
      description: lessonData.description,
      orderNumber: lessonData.orderNumber
    }
  });
  return challenge.save();
};

const addExam = async (challengeId, unitName, examData) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.name === unitName);
  unit.exam = {
    examInfo: {
      name: examData.name,
      description: examData.description,
      durationInMinutes: examData.durationInMinutes
    }
  };
  return challenge.save();
};

const getExam = async(challengeId, unitName) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.name === unitName);
  return unit.exam;
};

const addExerciseToLesson = async (challengeId, unitName, lessonName, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.name === unitName);
  const lesson = unit.lessons.find(lesson => lesson.lessonInfo.name === lessonName);
  lesson.exercises.push(exercise);
  return challenge.save();
};

const addExerciseToExam = async (challengeId, unitName, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.name === unitName);
  unit.exam.exercises.push(exercise);
  return challenge.save();
};

const listChallengeAttempts = (challengeId) => {
  return challengeAttemptModel.find({challengeId: challengeId});
};

const resolveExercise = async(challengeId, userId, unitName, exerciseId, solution) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.name === unitName);

  const challengeAttempt = await challengeAttemptModel.findOne({challengeId: challengeId, userId: userId});
  const unitAttempt = challengeAttempt.unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.name === unitName);
  const examAttempt = unitAttempt.examAttempt;

  const exerciseToResolve = unit.exam.exercises.find(exercise => exercise._id.toString() === exerciseId);
  const correctAnswer = exerciseToResolve.options.find(option => option.correct === true).text;

  const exerciseAttempt = {
    exercise: exerciseToResolve,
    optionAnswered: solution.answer
  };

  if (solution.answer === correctAnswer) {
    exerciseAttempt.status = STATUSES.PASSED;
  } else {
    exerciseAttempt.status = STATUSES.FAILED
  }

  examAttempt.exercisesAttempts.push(exerciseAttempt);

  return challengeAttempt.save();
}

module.exports = {
  findChallenge,
  listChallenges,
  createChallenge,
  addUnit,
  addLesson,
  addExam,
  getExam,
  addExerciseToLesson,
  addExerciseToExam,
  deleteChallenges,
  resolveExercise,
  listChallengeAttempts
};
