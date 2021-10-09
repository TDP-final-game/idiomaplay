const factory = require('../errorFactory')

module.exports = {
  ChallengeInProgress: () => factory('ChallengeInProgress')('Challenge already in progress'),
  ChallengeNotFound: () => factory('ChallengeNotFound')('Challenge not found')
}
