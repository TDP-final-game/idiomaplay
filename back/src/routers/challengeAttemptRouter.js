'use strict';

const express = require('express');

const challengeAttemptController = require('../controllers/challengeAttemptController');

const router = express.Router();

router.post('/:userId', challengeAttemptController.attemptChallenge);
router.put('/:challengeAttemptId/unitsAttempts', challengeAttemptController.attemptUnit);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt', challengeAttemptController.attemptExam);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', challengeAttemptController.attemptLesson);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber/exercisesAttempts',
	challengeAttemptController.attemptLessonExercise);
router.put('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt/exercisesAttempts', challengeAttemptController.attemptExamExercise);

router.get('/:challengeAttemptId', challengeAttemptController.getChallenge);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber', challengeAttemptController.getUnit);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber', challengeAttemptController.getLesson);
router.get('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt', challengeAttemptController.getExam);

module.exports = router;
