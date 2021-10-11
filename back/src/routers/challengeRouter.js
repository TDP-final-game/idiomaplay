'use strict';

const express = require('express');

const challengeController = require('../controllers/challengeController');

const router = express.Router();

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.listChallenges);
router.get('/:challengeId', challengeController.findChallenge);
router.get('/:challengeId/attempts', challengeController.listChallengeAttempts);
router.post('/:challengeId/units', challengeController.addUnit);
router.post('/:challengeId/units/:unitOrderNumber/exams', challengeController.addExam);
router.get('/:challengeId/units/:unitOrderNumber/exams', challengeController.getExam);
router.post('/:challengeId/units/:unitOrderNumber/lessons', challengeController.addLesson);
router.post('/:challengeId/units/:unitOrderNumber/exams/exercises', challengeController.addExerciseToExam);
router.post('/:challengeId/units/:unitOrderNumber/lessons/:lessonOrderNumber/exercises', challengeController.addExerciseToLesson);

module.exports = router;
