const express = require('express');

const domainController = require('../controllers/domainController');

const router = express.Router().
    post('/challenges', domainController.createChallenge).
    get('/challenges/:challengeId', domainController.findChallenge).
    post('/challenges/:challengeId/units/', domainController.addUnit).
    post('/challenges/:challengeId/units/:unitId/exams', domainController.addExam).
    post('/challenges/:challengeId/units/:unitId/exams/exercises', domainController.addExerciseToExam).
    post('/challenges/:challengeId/units/:unitId/lessons', domainController.addLesson).
    post('/challenges/:challengeId/units/:unitId/lessons/:lessonId/exercises', domainController.addExerciseToLesson);

module.exports = router;
