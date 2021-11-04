import api from './api';

async function getUnitsAttempts(challengeAttemptId) {
    const challengeAttempts = (await api.get('/users/me/challengeAttempts')).data;

    if (challengeAttempts.length === 0) {
        const challenge = (await api.get('/challenges')).data[0]

        const challengeAttempt = (await api.post(`/challengeAttempts`, {
            challengeId: challenge.id,
        })).data;
        return challengeAttempt.unitsAttempts;
    }

    return challengeAttempts[challengeAttempts.length - 1].unitsAttempts;
}

async function attemptUnit(challengeAttemptId, unitOrderNumber) {
    let unitAttempt = (await api.get(
        `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`
    )).data;

    if (unitAttempt.status === 'IN_PROGRESS') {
        return unitAttempt.lessonsAttempts;
    }

    return (await api.put(`/challengeAttempts/${challengeAttemptId}/unitsAttempts`, {
        unitOrderNumber: unitOrderNumber,
    })).data.lessonsAttempts;
}

export default {
    getUnitsAttempts,
    attemptUnit
};
