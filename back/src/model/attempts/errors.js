const factory = require('../../errorFactory')

module.exports = {
  ChallengeAttemptNotInProgress: () => factory('ChallengeAttemptNotInProgress')('Challenge attempt is not in progress'),
  UnitAttemptNotFound: ({unitOrderNumber}) => factory('UnitAttemptNotFound')(`Unit attempt ${unitOrderNumber} not found`),
  UnitAttemptNotInProgress: () => factory('UnitAttemptNotInProgress')('Challenge attempt is not in progress'),
  ExamAttemptWithUnfinishedLessons: () => factory('ExamAttemptWithUnfinishedLessons')('Can\'t attempt exam before passing all lessons'),
  LessonAttemptNotFound: ({lessonOrderNumber}) => factory('LessonAttemptNotFound')(`Lesson attempt ${lessonOrderNumber} not found`),
  ExerciseAttemptNotFound: ({exerciseOrderNumber}) => factory('ExerciseAttemptNotFound')(`Exercise attempt ${exerciseOrderNumber} not found`),
  ExerciseNotPending: () => factory('ExerciseNotPending')(`Exercise is not pending`),
  AnswerNotFound: ({answer}) => factory('AnswerNotFound')(`Answer "${answer}" is not an option`),
}
