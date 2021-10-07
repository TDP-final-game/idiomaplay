const express = require('express');

const challengeController = require('../controllers/challengeController');

const router = express.Router();

/*
 * Challenges CRUD
 */

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.listChallenges);
router.get('/:challengeId', challengeController.findChallenge);
router.get('/:challengeId/units/exams', challengeController.getExam);
router.post('/:challengeId/units/', challengeController.addUnit);
router.post('/:challengeId/units/exams/', challengeController.addExam);
router.post('/:challengeId/units/exams/exercises', challengeController.addExerciseToExam);
router.post('/:challengeId/units/lessons/', challengeController.addLesson);
router.post('/:challengeId/units/lessons/exercises', challengeController.addExerciseToLesson);

router.get('/:challengeId/attempts', challengeController.listChallengeAttempts); // todo: pasarlo al otro router (con filtros)

router.post('/:challengeId/attempts/units', challengeController.attemptUnit);
router.post('/:challengeId/attempts/units/exams', challengeController.attemptExam);
router.post('/:challengeId/attempts/units/exams/:exerciseId', challengeController.resolveExercise);

module.exports = router;
