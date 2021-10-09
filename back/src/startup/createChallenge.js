const challengesServices = require('../services/challengeService');
const challenge = require('./challenge');

module.exports = async () => {
  try {
    await challengesServices.deleteChallenges();
    const result = await challengesServices.createChallenge(challenge);
    console.log(`Challenge created with id ${result._id}!`, )
  } catch (e) {
    console.error('Challenge not created!', e)
  }
}
