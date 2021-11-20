import api from './api';

async function getChallenges() {
  const response = await api.get('/challenges');

  return response.data.map((challenge) => {
    return {
      description: challenge.description,
      difficult: challenge.difficult,
      _id: challenge._id,
      name: challenge.name,
    };
  });
}

async function getUnitsAttempts(challengeAttemptId) {
  const challengeAttempts = (await api.get('/users/me/challengeAttempts')).data;

  if (challengeAttempts.length === 0) {
    const challengeAttempt = (
      await api.post(`/challengeAttempts`, {
        challengeId: '61778ec34bb09bb4fee3d5df',
      })
    ).data;

    return challengeAttempt.unitsAttempts;
  }

  return challengeAttempts[challengeAttempts.length - 1].unitsAttempts;
}

async function attemptUnit(challengeAttemptId, unitOrderNumber) {
  let unitAttempt = (
    await api.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`)
  ).data;

  if (unitAttempt.status === 'IN_PROGRESS') {
    return unitAttempt.lessonsAttempts;
  }

  return (
    await api.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts`, {
      unitOrderNumber: unitOrderNumber,
    })
  ).data.lessonsAttempts;
}

export default {
  getChallenges,
  getUnitsAttempts,
  attemptUnit,
};
