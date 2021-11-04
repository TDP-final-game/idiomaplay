import api from './api';

Array.prototype.findUnitAttempt = function (unitOrderNumber) {
  return this.find((unitAttempt) => unitAttempt.orderNumber === unitOrderNumber);
};

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessonsAttempts(unitOrderNumber) {
  const challengeAttempts = (await api.get('/users/me/challengeAttempts')).data;

  if (challengeAttempts.length === 0) {
    const challenge = (await api.get('/challenges')).data[0]

    const challengeAttempt = (await api.post(`/challengeAttempts`, {
      challengeId: challenge.id,
    })).data;

    const unitAttempt = (await api.put(`/challengeAttempts/${challengeAttempt.id}/unitsAttempts`, {
      unitOrderNumber: unitOrderNumber,
    })).data;

    return unitAttempt.lessonsAttempts;
  }

  return challengeAttempts[challengeAttempts.length - 1].unitsAttempts.findUnitAttempt(unitOrderNumber).lessonsAttempts;
}

async function attemptLesson(unitOrderNumber, lessonOrderNumber) {
  let response = await api.get('/users/me/challengeAttempts');
  let challengeAttempt = response.data[response.data.length - 1];

  let lessonAttempt = (await api.get(
    `/challengeAttempts/${challengeAttempt.id}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`
  )).data;

  if (lessonAttempt.status === 'IN_PROGRESS') {
    return lessonAttempt.exercisesAttempts;
  }

  lessonAttempt = (await api.put(
    `/challengeAttempts/${challengeAttempt.id}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`,
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
