import api from './api';

async function answerExercise(challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) {
  return (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`,
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

async function abort(challengeAttemptId, unitOrderNumber) {
  return await api.put(
    `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempts/abort`
  );
}

export default {
  answerExercise,
  getReward,
  abort,
};
