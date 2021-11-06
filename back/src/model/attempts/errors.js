'use strict';

const ApiError = require('../../apiError');
const STATUS_CODES = require('../../constants/status_codes.json');

module.exports = {
	ChallengeAttemptNotInProgress: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Challenge attempt is not in progress'),
	UnitAttemptNotFound: ({ unitOrderNumber }) => new ApiError(STATUS_CODES.BAD_REQUEST, `Unit attempt ${unitOrderNumber} not found`),
	UnitAttemptNotInProgress: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Unit attempt is not in progress'),
	ExamAttemptWithUnfinishedLessons: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Can\'t attempt exam before passing all lessons'),
	LessonAttemptNotFound: ({ lessonOrderNumber }) => new ApiError(STATUS_CODES.BAD_REQUEST, `Lesson attempt ${lessonOrderNumber} not found`),
	ExerciseAttemptNotFound: ({ exerciseOrderNumber }) => new ApiError(STATUS_CODES.BAD_REQUEST,
		`Exercise attempt ${exerciseOrderNumber} not found`),
	ExerciseNotPending: () => new ApiError(STATUS_CODES.BAD_REQUEST, 'Exercise is not pending'),
	AnswerNotFound: ({ answer }) => new ApiError(STATUS_CODES.BAD_REQUEST, `Answer "${answer}" is not an option`),
	ExamExpired: expirationDate => new ApiError(STATUS_CODES.BAD_REQUEST, `Exam expired at ${expirationDate}`)
};
