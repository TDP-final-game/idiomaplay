const express = require('express');

const domainController = require('../controllers/domainController');

const router = express.Router();

router.post('/challenges', domainController.createChallenge);
router.get('/challenges/:challengeId', domainController.findChallenge);
router.post('/challenges/:challengeId/units/', domainController.addUnit);
router.post('/challenges/:challengeId/units/:unitId/exams', domainController.addExam);
router.post('/challenges/:challengeId/units/:unitId/exams/exercises', domainController.addExerciseToExam);
router.post('/challenges/:challengeId/units/:unitId/lessons', domainController.addLesson);
router.post('/challenges/:challengeId/units/:unitId/lessons/:lessonId/exercises', domainController.addExerciseToLesson);

module.exports = router;
