import api from './api';
import { completeSentenceMock, translateToForeignMock, translateToNativeMock, } from '../config/mocks';

const ex = [translateToNativeMock, translateToForeignMock, completeSentenceMock];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCorrectAswer(excerciseId) {
  const currEx = ex.find((e) => e.id === excerciseId);
  return currEx.options[getRandomInt(0, currEx.options.length)];
}

export const getNextExercise = async () => {
  return ex[getRandomInt(0, 3)];
};

export default {
  getHealth: () => api.get('../../healthz'),
  answerExercise: (answer, exerciseId) => new Promise.resolve({data: getCorrectAswer(exerciseId)}),
  nextExercise: () => new Promise.resolve({data: getNextExercise()})
}
