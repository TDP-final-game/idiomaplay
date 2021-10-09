const factory = require('../../errorFactory')

module.exports = {
  ChallengeNotInProgress: () => factory('ChallengeNotInProgress')('Challenge attempt is not in progress'),
  UnitAttemptNotFound: ({unitOrderNumber}) => factory('UnitAttemptNotFound')(`Unit attempt ${unitOrderNumber} not found`),
}
