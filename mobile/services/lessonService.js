import api from './api';

async function answerExercise(
  challengeAttemptId,
  unitOrderNumber,
  lessonOrderNumber,
  exerciseOrderNumber,
  answer
) {
  return (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/exercisesAttempts`,
      { answer, exerciseOrderNumber }
    )
  ).data;
}

async function getResult(
  challengeAttemptId,
  unitOrderNumber,
  lessonOrderNumber
) {
  return (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/results`)
  ).data;
}

export default {
  answerExercise,
  getResult
};
