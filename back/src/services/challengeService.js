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

const attemptChallenge = async (challengeId, userId = USER_ID) => {
  // todo: si hay Challenge Attempt de este Challenge 'IN_PROGRESS' error diciendo q no se puede arrancar otra vez el Challenge
  const challenge = await challengeModel.findOne({_id: challengeId});
  return challengeAttemptModel.create({
    userId,
    challengeInfo: challenge.challengeInfo,
    challengeId: challenge._id
  });
};

const attemptUnit = async(challengeId, userId) => {
  // todo: si hay Unit Attempt de esta unidad 'IN_PROGRESS' error diciendo q no se puede arrancar otra vez esta unidad
  const challenge = await challengeModel.findOne({_id: challengeId});
  const challengeAttempt = await challengeAttemptModel.findOne({challengeId: challengeId, userId: userId});

  // en la ultima posicion del array de UnitsAttempts voy a encontrar la ultima unidad en curso
  const len = challengeAttempt.unitsAttempts.length;
  let lastOrderNumber = -1;
  if (len !== 0) {
    lastOrderNumber = challengeAttempt.unitsAttempts[len - 1].unitInfo.orderNumber;
  }

  // buscamos la unidad con menor orderNumber que cumpla orderNumber > lastOrderNumber
  let unitToAssign = challenge.units[0];
  challenge.units.forEach(unit => {
    const currentOrderNumber = unit.unitInfo.orderNumber;
    if (currentOrderNumber > lastOrderNumber && currentOrderNumber < unitToAssign.unitInfo.orderNumber) {
        unitToAssign = unit;
    }
  });

  challengeAttempt.unitsAttempts.push({
    unitInfo: unitToAssign.unitInfo
  });

  return challengeAttempt.save();
};

const attemptExam = async(challengeId, userId, unitName) => {
  // todo: si hay Exam Attempt de este examen 'IN_PROGRESS' error diciendo q no se puede arrancar otra vez el examen
  // todo: validar si completo todas las lecciones!
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.name === unitName);

  const challengeAttempt = await challengeAttemptModel.findOne({challengeId: challengeId, userId: userId});
  const unitAttempt = challengeAttempt.unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.name === unitName);

  unitAttempt.examAttempt = {
    examInfo: unit.exam.examInfo
  };

  return unitAttempt.save();
};

const listChallengeAttempts = (challengeId) => {
  return challengeAttemptModel.find({challengeId: challengeId});
};

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
  attemptChallenge,
  attemptUnit,
  attemptExam,
  listChallengeAttempts
};
