const express = require('express');

const challengeAttemptController = require('../controllers/challengeAttemptController');

const router = express.Router();

router.post('/', challengeAttemptController.attemptChallenge);
router.post('/:challengeAttemptId/unitsAttempts', challengeAttemptController.attemptUnit);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt', challengeAttemptController.attemptExam);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', challengeAttemptController.attemptLesson);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts/:lessonOrderNumber/exercisesAttempts', challengeAttemptController.attemptLessonExercise);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempt/exercisesAttempts', challengeAttemptController.attemptExamExercise);

module.exports = router;
