'use strict';

const express = require('express');

const challengeController = require('../controllers/challengeController');

const middlewares = require('../controllers/middlewares/index');

const router = express.Router();

router.use(middlewares);

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.listChallenges);
router.get('/:challengeId', challengeController.findChallenge);
router.get('/:challengeId/attempts', challengeController.listChallengeAttempts);

router.get('/:challengeId/units', challengeController.getUnits);
router.post('/:challengeId/units', challengeController.addUnit);
router.get('/:challengeId/units/:unitOrderNumber', challengeController.getUnit);

router.post('/:challengeId/units/:unitOrderNumber/exams', challengeController.addExam);
router.get('/:challengeId/units/:unitOrderNumber/exams', challengeController.getExam);
router.post('/:challengeId/units/:unitOrderNumber/exams/exercises', challengeController.addExerciseToExam);

router.get('/:challengeId/units/:unitOrderNumber/lessons', challengeController.getLessons);
router.post('/:challengeId/units/:unitOrderNumber/lessons', challengeController.addLesson);
router.get('/:challengeId/units/:unitOrderNumber/lessons/:lessonOrderNumber', challengeController.getLesson);

router.get('/:challengeId/units/:unitOrderNumber/lessons/:lessonOrderNumber/exercises', challengeController.getLessonExercises);
router.post('/:challengeId/units/:unitOrderNumber/lessons/:lessonOrderNumber/exercises', challengeController.addExerciseToLesson);
router.get('/:challengeId/units/:unitOrderNumber/lessons/:lessonOrderNumber/exercises/:exerciseNumber', challengeController.getLessonExercise);

module.exports = router;
