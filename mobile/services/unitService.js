import api from './api';

Array.prototype.findUnitAttempt = function (unitOrderNumber) {
  return this.find((unitAttempt) => unitAttempt.orderNumber === unitOrderNumber);
};

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessonsAttempts(userId, unitOrderNumber) {
  let response = await api.get(`/users/${userId}/challengeAttempts`);

  if (response.data.length === 0) {
    response = await api.post(`/challengeAttempts/${userId}`, {
      challengeId: '61778ec34bb09bb4fee3d5df',
    });

    let challengeAttemptId = response.data._id;

    response = await api.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts`, {
      unitOrderNumber: unitOrderNumber,
    });

    response = await api.get(`/users/${userId}/challengeAttempts`);
  }

  return response.data[response.data.length - 1].unitsAttempts.findUnitAttempt(unitOrderNumber)
    .lessonsAttempts;
}

async function attemptLesson(userId, unitOrderNumber, lessonOrderNumber) {
  let response = await api.get(`/users/${userId}/challengeAttempts`);

  const challengeAttemptId = response.data[response.data.length - 1].id;

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

async function allLessonsPassed(userId, unitOrderNumber) {
  const response = await getLessonsAttempts(userId, unitOrderNumber);
  return response.every((lesson) => lesson.status === 'PASSED');
}

export default {
  getLessonsAttempts: getLessonsAttempts,
  attemptLesson: attemptLesson,
  allLessonsPassed: allLessonsPassed,
};
