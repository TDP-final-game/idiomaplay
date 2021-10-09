const factory = require('../../errorFactory')

module.exports = {
  ChallengeAttemptNotInProgress: () => factory('ChallengeAttemptNotInProgress')('Challenge attempt is not in progress'),
  UnitAttemptNotFound: ({unitOrderNumber}) => factory('UnitAttemptNotFound')(`Unit attempt ${unitOrderNumber} not found`),
  UnitAttemptNotInProgress: () => factory('UnitAttemptNotInProgress')('Challenge attempt is not in progress'),
  ExamAttemptWithUnfinishedLessons: () => factory('ExamAttemptWithUnfinishedLessons')('Can\'t attempt exam before passing all lessons'),
}
