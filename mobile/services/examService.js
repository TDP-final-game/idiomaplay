import api from './api';

async function answerExercise(challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) {
  return (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempts/exercisesAttempts`,
      { answer, exerciseOrderNumber }
    )
  ).data;
}

async function getReward(challengeAttemptId, unitOrderNumber) {
  const examAttempt = (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempts`
    )
  ).data;

  return examAttempt.reward;
}

export default {
  answerExercise,
  getReward,
};
