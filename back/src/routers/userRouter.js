const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/challenges/:challengeId', userController.startChallenge);
router.post('/challenges/:challengeId/units', userController.startUnit);
router.post('/challenges/:challengeId/lessons', userController.startLesson);
router.get('/challenges/:challengeId/exercises', userController.getExerciseToComplete);
router.put('/challenges/:challengeId/exercises/:exerciseId', userController.saveUserExerciseSolution);

module.exports = router;
