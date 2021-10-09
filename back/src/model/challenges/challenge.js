const mongoose = require('mongoose');
const ChallengeInfo = require('./challengeInfo');
const {schema: Unit} = require('../units/unit');

const Challenge = new mongoose.Schema({
  challengeInfo: {
    type: ChallengeInfo,
    required: [true, 'ChallengeInfo is required']
  },
  units: [{type: Unit, required: false}]
});


module.exports = {
  schema: Challenge,
  model: mongoose.model('Challenge', Challenge)
};
