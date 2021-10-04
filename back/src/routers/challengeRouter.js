const express = require('express');

const challengeController = require('../controllers/challengeController');

const router = express.Router();

/*
 * Challenges CRUD
 */

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.listChallenges);
router.get('/:challengeId', challengeController.findChallenge);
router.post('/:challengeId/units/', challengeController.addUnit);
router.post('/:challengeId/units/exams/', challengeController.addExam);
router.post('/:challengeId/units/:unitId/exams/exercises', challengeController.addExerciseToExam);
router.post('/:challengeId/units/lessons/', challengeController.addLesson);
router.post('/:challengeId/units/:unitId/lessons/:lessonId/exercises', challengeController.addExerciseToLesson);

/*
 * Challenges Attempts
 */
router.post('/:challengeId/attempts', challengeController.attemptChallenge);
router.get('/:challengeId/attempts', challengeController.listChallengeAttempts);

module.exports = router;
