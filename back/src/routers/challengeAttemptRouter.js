const express = require('express');

const challengeAttemptController = require('../controllers/challengeAttemptController');

const router = express.Router();

router.post('/', challengeAttemptController.attemptChallenge);

module.exports = router;
