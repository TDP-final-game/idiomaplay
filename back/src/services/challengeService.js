const {model: challengeModel} = require('../model/challenges/challenge');
const {model: challengeAttemptModel} = require('../model/attempts/challengeAttempt');

const {pageSize} = require('../constants/pagination_default.json');

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

const addLesson = async (challengeId, unitOrderNumber, lessonData) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.orderNumber == unitOrderNumber);
  unit.lessons.push({
    lessonInfo: {
      name: lessonData.name,
      description: lessonData.description,
      orderNumber: lessonData.orderNumber
    }
  });
  return challenge.save();
};

const addExam = async (challengeId, unitOrderNumber, examData) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.orderNumber == unitOrderNumber);
  unit.exam = {
    examInfo: {
      name: examData.name,
      description: examData.description,
      durationInMinutes: examData.durationInMinutes
    }
  };
  return challenge.save();
};

const getExam = async(challengeId, unitOrderNumber) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.orderNumber == unitOrderNumber);
  return unit.exam;
};

const addExerciseToLesson = async (challengeId, unitOrderNumber, lessonOrderNumber, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unit => unit.unitInfo.orderNumber == unitOrderNumber);
  const lesson = unit.lessons.find(lesson => lesson.lessonInfo.orderNumber == lessonOrderNumber);
  lesson.exercises.push(exercise);
  return challenge.save();
};

const addExerciseToExam = async (challengeId, unitOrderNumber, exercise) => {
  const challenge = await challengeModel.findOne({_id: challengeId});
  const unit = challenge.units.find(unitToUpdate => unitToUpdate.unitInfo.orderNumber == unitOrderNumber);
  unit.exam.exercises.push(exercise);
  return challenge.save();
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
  listChallengeAttempts
};