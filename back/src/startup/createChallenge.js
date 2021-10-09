const challengesServices = require('../services/challengeService');
const {model: challengeModel} = require('../model/challenges/challenge');
const challenge = require('./challenge');

module.exports = async () => {
  try {
    await challengesServices.deleteChallenges();
    const result = await challengeModel.create(challenge);
    console.log(`Challenge created with id ${result._id}!`, )
  } catch (e) {
    console.error('Challenge not created!', e)
  }
}
