import api from './api';

async function answerExercise(challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) {
  return (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt/exercisesAttempts`,
      { answer, exerciseOrderNumber }
    )
  ).data;
}

export default {
  answerExercise,
};
