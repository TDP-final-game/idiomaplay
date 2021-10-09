const mongoose = require('mongoose');
const ChallengeInfo = require('./challengeInfo');
const Unit = require('../units/unit');

const Challenge = new mongoose.Schema({
  challengeInfo: {
    type: ChallengeInfo,
    required: [true, 'ChallengeInfo is required']
  },
  units: [{type: Unit, required: false}]
});


module.exports = Challenge;
