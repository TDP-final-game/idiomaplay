import api from './api';
import { states } from '../config/states';

const _allUnitsPassed = function (units) {
  return units.every((unit) => unit.status === states.passed);
};

async function getChallenges() {
  const response = await api.get('/challenges');

  const challengeAttempts = {};
  (await api.get('/users/me/challengeAttempts')).data.forEach((challengeAttempt) => {
    challengeAttempts[challengeAttempt.challenge._id] = challengeAttempt;
  });

  const res = [];
  response.data.forEach((challenge) => {
    res.push(challengeAttempts[challenge._id] ?? attemptChallenge(challenge._id));
  });
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
