'use strict';

const express = require('express');

const challengeAttemptController = require('../controllers/challengeAttemptController');
const authentication = require('../controllers/middlewares/authentication');
const detectActivity = require('../controllers/middlewares/detectActivity');

const router = express.Router();

// the order matters :)
router.use([authentication, detectActivity]);

router.post('/', challengeAttemptController.attemptChallenge);
router.put('/:challengeAttemptId/unitsAttempts', challengeAttemptController.attemptUnit);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempts', challengeAttemptController.attemptExam);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', challengeAttemptController.attemptLesson);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber/exercisesAttempts',
	challengeAttemptController.attemptLessonExercise);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempts/exercisesAttempts', challengeAttemptController.attemptExamExercise);
router.get('/:challengeAttemptId', challengeAttemptController.getChallenge);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber', challengeAttemptController.getUnit);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber', challengeAttemptController.getLesson);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempts', challengeAttemptController.getExam);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempts/abort', challengeAttemptController.abortExamAttempt);

module.exports = router;
