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

async function getReward(challengeAttemptId, unitOrderNumber, lessonOrderNumber) {
  const lessonAttempt = (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`
    )
  ).data;

  return lessonAttempt.reward;
}

export default {
  answerExercise,
  getReward,
};
