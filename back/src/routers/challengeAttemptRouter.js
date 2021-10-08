const express = require('express');

const challengeAttemptController = require('../controllers/challengeAttemptController');

const router = express.Router();

router.post('/', challengeAttemptController.attemptChallenge);
router.post('/:challengeAttemptId/unitsAttempts', challengeAttemptController.attemptUnit);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/examAttempts', challengeAttemptController.attemptExam);
router.post('/:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', challengeAttemptController.attemptLesson);

module.exports = router;
