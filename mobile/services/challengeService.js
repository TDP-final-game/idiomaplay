import api from './api';
import { states } from '../config/states';

const _allUnitsPassed = function (units) {
  return units.every((unit) => unit.status === states.passed);
};

async function getChallenges(language) {
  let params = null;
  if (language!=='all') {
    params = {language}
  }
  const response = await api.get('/challenges', null,{ params });

  const challengeAttempts = {};
  (await api.get('/users/me/challengeAttempts')).data.forEach((challengeAttempt) => {
    challengeAttempts[challengeAttempt.challenge._id] = challengeAttempt;
  });

  const res = [];

  for (let challenge of response.data) {
    let challengeAttempt = challengeAttempts[challenge._id];

    if (!challengeAttempt) {
      challengeAttempt = await attemptChallenge(challenge._id);
    }

    res.push(challengeAttempt);
  }

  return res;
}

async function attemptChallenge(challengeId) {
  return (
    await api.post(`/challengeAttempts`, {
      challengeId,
    })
  ).data;
}

async function getUnitsAttempts(challengeAttemptId) {
  return (await api.get(`/challengeAttempts/${challengeAttemptId}`)).data.unitsAttempts;
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

async function allUnitsPassed(challengetAttemptId) {
  const unitsAttempts = await getUnitsAttempts(challengetAttemptId);
  return _allUnitsPassed(unitsAttempts);
}

export default {
  getChallenges,
  getUnitsAttempts,
  attemptUnit,
  allUnitsPassed,
};
