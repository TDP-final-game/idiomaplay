import api from './api';
import {
  completeSentenceMock,
  translateToForeignMock,
  translateToNativeMock,
  corrtectAnswers,
} from '../config/mocks';

import store from '../redux/store';

const ex = [translateToNativeMock, translateToForeignMock, completeSentenceMock];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function answerExercise(answer, exerciseId) {
  const correctAnswer = corrtectAnswers[exerciseId];
  return {
    correctAnswer,
    result: correctAnswer === answer,
  };
}

export const getNextExercise = async () => {
  var results = store.getState().challenge.exerciseResults;
  // HARDCODED para que se peuda pasar a la pantalla de examen
  if (results.length == 8) return null;
  return ex[getRandomInt(0, 3)];
};

export default {
  getHealth: () => api.get('../../healthz'),
  answerExercise: (answer, exerciseId) =>
    new Promise.resolve({ data: answerExercise(answer, exerciseId) }),
  nextExercise: () => new Promise.resolve({ data: getNextExercise() }),
};
