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

export default {
    getUnitsAttempts: getUnitsAttempts,
};
