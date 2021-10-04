const mongoose = require('mongoose');
const Challenge = require('../schemas/challenges/challenge');
const ChallengeAttempt = require('../schemas/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');
const STATUSES = require("../constants/statuses");

const USER_ID = '61553000155f46e004a252c4';

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

const addLesson = async (challengeId, unitId, lesson) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate._id === unitId);
  unit.lessons.push(lesson);
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

const addExerciseToLesson = async (challengeId, unitId, lessonId, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit._id === unitId);
  const lesson = unit.lessons.find(lesson => lesson._id === lessonId);
  lesson.exercises.push(exercise);
  return challenge.save();
};

const addExerciseToExam = async (challengeId, unitId, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit._id === unitId);
  unit.exam.exercises.push(exercise);
  return challenge.save();
};

const attemptChallenge = async (challengeId, userId = USER_ID) => {
  const challenge = await challengeModel.findOne({_id: challengeId}).lean();
  const challengeAttempt = {
    ...challenge,
    userId,
    status: STATUSES.IN_PROGRESS,
    unitsAttempts: challenge.units.map(unit => ({
      ...unit,
      status: STATUSES.IN_PROGRESS,
      lessonsAttempts: unit.lessons.map(lesson => ({
        ...lesson,
        status: STATUSES.IN_PROGRESS,
        exercisesAttempts: lesson.exercises.map(exercise => ({
          ...exercise,
          status: STATUSES.IN_PROGRESS,
        }))
      }))
    }))
  };

  return challengeAttemptModel.create(challengeAttempt);
};

const listChallengeAttempts = (challengeId) => {
  return challengeAttemptModel.find({"challenge._id": challengeId});
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
  attemptChallenge,
  listChallengeAttempts
};
