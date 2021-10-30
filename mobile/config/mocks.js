import { exerciseTypes } from './exercisesTypes';

export const translateToNativeMock = {
  id: 1,
  unit: 1,
  lesson: 1,
  type: exerciseTypes.TRANSLATE_TO_NATIVE,
  statement: "Today It's a great day to save lives",
  options: [
    'Hoy es un buen día para salvar vidas',
    'Soy bueno salvando vidas',
    'Muchos dias no salvamos vidas',
    'Muchos de estos dias no salvamos vidas',
    'Las vidas no son siempre salvables',
    'Ayer fue un gran dia para salvar vidas',
  ],
};

export const translateToForeignMock = {
  id: 2,
  unit: 1,
  lesson: 1,
  type: exerciseTypes.TRANSLATE_TO_FOREIGN,
  statement: 'Hoy es un buen día para salvar vidas',
  options: [
    'Tomorrow Its a great day to save lifes',
    'Next year I will move to Lisboa',
    "Today It's a great day to save lives",
    'I care about people lives',
    'Hyde, how you doing?',
    'Bye, hope you have a nice day',
  ],
};

export const completeSentenceMock = {
  id: 3,
  unit: 1,
  lesson: 1,
  type: exerciseTypes.COMPLETE_SENTENCE,
  statement: 'There was a __________________ when people do not shower”',
  options: ['Cute', 'Time', 'Dirty', 'Place'],
};

export const listenSentenceMock = {
  id: 4,
  unit: 1,
  lesson: 1,
  type: exerciseTypes.LISTENING,
  statement: 'Hello my friend”',
  options: ['Hello my friend', 'Hello my bestman', 'Hello there', 'Hi'],
};

export const correctAnswers = {
  1: 'Hoy es un buen día para salvar vidas',
  2: "Today It's a great day to save lives",
  3: 'Time',
  4: 'Hello my friend',
};
