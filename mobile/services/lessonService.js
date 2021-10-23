import api from './api';

function create(challengeAttemptId, unitOrderNumber, lessonOrderNumber) {
    const url = `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}/exercisesAttempts`;
    return {
        answerExercise
    }

    async function answerExercise(answer, exerciseOrderNumber) {
        const response = await api.put(url, {answer, exerciseOrderNumber});
        return response.data;
    }
}

export default {
    create: create
};
