import api from './api';

Array.prototype.findUnitAttempt = function (unitOrderNumber) {
  return this.find((unitAttempt) => unitAttempt.orderNumber === unitOrderNumber);
};

Array.prototype.findLessonAttempt = function (lessonOrderNumber) {
  return this.find((lessonAttempt) => lessonAttempt.orderNumber === lessonOrderNumber);
};

async function getLessonsAttempts(userId, unitOrderNumber) {
  let response = await api.get(`/users/${userId}/challengeAttempts`);

  console.log('HOLA_1 ', response.data);

  if (response.data.length === 0) {
    response = await api.post(`/challengeAttempts/${userId}`, {
      challengeId: '61778ec34bb09bb4fee3d5df',
    });

    console.log('HOLA_2 ', response.data);

    let challengeAttemptId = response.data.id;

    response = await api.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts`, {
      unitOrderNumber: unitOrderNumber,
    });

    console.log('HOLA_3 ', response.data);

    response = await api.get(`/users/${userId}/challengeAttempts`);

    console.log('HOLA_4 ', response.data);
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

export default {
  getLessonsAttempts: getLessonsAttempts,
  attemptLesson: attemptLesson,
};
