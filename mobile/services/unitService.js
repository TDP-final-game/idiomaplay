import api from './api';

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessonsAttempts(challengeAttemptId, unitOrderNumber) {
  const unitAttempt = (await api.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`)).data;
  return unitAttempt.lessonsAttempts;
}

async function attemptLesson(challengeAttemptId, unitOrderNumber, lessonOrderNumber) {
  let lessonAttempt = (await api.get(
    `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`
  )).data;

  if (lessonAttempt.status === 'IN_PROGRESS') {
    return lessonAttempt.exercisesAttempts;
  }

  lessonAttempt = (await api.put(
    `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`,
    { lessonOrderNumber }
  )).data;

  return lessonAttempt.exercisesAttempts;
}

async function allLessonsPassed(userId, unitOrderNumber) {
  const response = await getLessonsAttempts(userId, unitOrderNumber);
  return response.every((lesson) => lesson.status === 'PASSED');
}

export default {
  getLessonsAttempts: getLessonsAttempts,
  attemptLesson: attemptLesson,
  allLessonsPassed: allLessonsPassed,
};
