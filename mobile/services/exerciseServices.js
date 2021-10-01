import {
  translateToNativeMock,
  translateToForeignMock,
  completeSentenceMock,
} from '../config/mocks';

const ex = [translateToNativeMock, translateToForeignMock, completeSentenceMock];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getNextExercise = async () => {
  return ex[getRandomInt(0, 3)];
};
