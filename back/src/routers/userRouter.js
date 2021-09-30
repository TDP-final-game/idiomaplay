const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router().
    post('/challenges/:challengeId', userController.startChallenge).
    post('/challenges/:challengeId/units', userController.startUnit).
    post('/challenges/:challengeId/lessons', userController.startLesson).
    get('/challenges/:challengeId/exercises', userController.getExerciseToComplete).
    put('/challenges/:challengeId/exercises/:exerciseId', userController.saveUserExerciseSolution);

module.exports = router;
