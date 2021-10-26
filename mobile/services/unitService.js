import api from './api';

Array.prototype.findUnitAttempt = function (unitOrderNumber) {
  return this.find((unitAttempt) => unitAttempt.orderNumber === unitOrderNumber);
};

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessonsAttempts(userId, unitOrderNumber) {
  const response = await api.get(`/users/${userId}/challengeAttempts`);

  if (response.data.length === 0) return [];

  return response.data[response.data.length - 1].unitsAttempts.findUnitAttempt(unitOrderNumber)
    .lessonsAttempts;
}

async function attemptLesson(userId, unitOrderNumber, lessonOrderNumber, challengeAttemptId) {
  let response = await api.get(`/users/${userId}/challengeAttempts`);

  console.log(response.data[response.data.length - 1]);

  response = await api.get(
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
  getLessonsAttempts: getLessonsAttempts,
  attemptLesson: attemptLesson,
};
