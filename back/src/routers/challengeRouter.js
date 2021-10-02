const express = require('express');

const challengeController = require('../controllers/challengeController');

const router = express.Router();

router.post('/challenges', challengeController.createChallenge);
router.get('/challenges/:challengeId', challengeController.findChallenge);
router.post('/challenges/:challengeId/units/', challengeController.addUnit);
router.post('/challenges/:challengeId/units/:unitId/exams', challengeController.addExam);
router.post('/challenges/:challengeId/units/:unitId/exams/exercises', challengeController.addExerciseToExam);
router.post('/challenges/:challengeId/units/:unitId/lessons', challengeController.addLesson);
router.post('/challenges/:challengeId/units/:unitId/lessons/:lessonId/exercises', challengeController.addExerciseToLesson);

module.exports = router;
