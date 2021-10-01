import api from './api';
import { completeSentenceMock, translateToForeignMock, translateToNativeMock, } from '../config/mocks';

const ex = [translateToNativeMock, translateToForeignMock, completeSentenceMock];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function answerExercise(answer, exerciseId) {
  const currEx = ex.find((e) => e.id === exerciseId);
  const correctAnswer = currEx.options[getRandomInt(0, currEx.options.length)];
  return {
    correctAnswer,
    result: correctAnswer === answer
  };
}

export const getNextExercise = async () => {
  return ex[getRandomInt(0, 3)];
};

export default {
  getHealth: () => api.get('../../healthz'),
  answerExercise: (answer, exerciseId) => new Promise.resolve({data: answerExercise(answer, exerciseId)}),
  nextExercise: () => new Promise.resolve({data: getNextExercise()})
}
