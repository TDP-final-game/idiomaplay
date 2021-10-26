import api from './api';

Array.prototype.findUnitAttempt = function (unitOrderNumber) {
  return this.find((unitAttempt) => unitAttempt.orderNumber === unitOrderNumber);
};

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessons(unitOrderNumber, challengeId) {
  const response = await api.get('/users/6161bbb002bf6b116530d717/challengeAttempts');
  return response.data[response.data.length - 1].unitsAttempts.findUnitAttempt(unitOrderNumber)
    .lessonsAttempts;
}

async function attemptLesson(unitOrderNumber, lessonOrderNumber, challengeAttemptId) {
  let response = await api.get(
    `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`
  );

  if (response.status === 200 && response.data.status === 'IN_PROGRESS') {
    return response.data.exercisesAttempts;
  }

  response = await api.put(
    `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`,
    { lessonOrderNumber }
  );
  return response.data.exercisesAttempts;
}

export default {
  getLessons: getLessons,
  attemptLesson: attemptLesson,
};
