import {
  translateToNativeMock,
  translateToForeignMock,
  completeSentenceMock,
} from '../config/mocks';

const ex = [translateToNativeMock, translateToForeignMock, completeSentenceMock];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getCorrectAswer(excerciseId) {
  const currEx = ex.find((e) => e.id === excerciseId);
  console.log(currEx);
  const answer = currEx.options[getRandomInt(0, currEx.options.length)];
  console.log(answer);
  return answer;
}

export const getNextExercise = async () => {
  return ex[getRandomInt(0, 3)];
};

export const sendAnswer = async (answer, exerciseId) => {
  return getCorrectAswer(exerciseId);
};
