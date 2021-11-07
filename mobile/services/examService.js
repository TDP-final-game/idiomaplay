import api from './api';

async function answerExercise(challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) {
  return (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`,
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
          `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt/result`)
  ).data;
}

export default {
  answerExercise,
  getResult
};
