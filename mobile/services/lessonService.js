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

export default {
  answerExercise,
};
