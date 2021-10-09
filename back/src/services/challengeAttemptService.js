const {model: challengeModel} = require('../model/challenges/challenge');
const {model: challengeAttemptModel} = require('../model/attempts/challengeAttempt');

const STATUSES = require("../constants/statuses");

const attemptChallenge = async (challengeId, userId) => {
    const attemptsInProgress = await challengeAttemptModel.find({challengeId: challengeId, userId: userId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length !== 0) throw Error('Challenge already in progress'); // todo: avoid using generic error

    const challenge = await challengeModel.findOne({_id: challengeId});
    if (!challenge) throw Error('Challenge not found');

    const unitsAttempts = challenge.units.map(unit => ({ unitInfo: unit.unitInfo }));

    return challengeAttemptModel.create({
        userId,
        challengeInfo: challenge.challengeInfo,
        challengeId: challenge._id,
        unitsAttempts: unitsAttempts
    });
};

const attemptUnit = async (challengeAttemptId, unitOrderNumber) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt is not in progress'); // todo: avoid using generic error

    const challengeAttempt = attemptsInProgress[0];
    const challenge = await challengeModel.findOne({_id: challengeAttempt.challengeId});

    const unit = challenge.units.find(unit => unit.unitInfo.orderNumber == unitOrderNumber);
    if (!unit) throw Error(`Unit with order number ${unitOrderNumber} not found`); // todo: avoid using generic error

    const addLessonsAttempts = function (unitAttempt) {
        unitAttempt.lessonsAttempts = unit.lessons.map(lesson => ({lessonInfo: lesson.lessonInfo}));
    };

    const addExamAttempt = function(unitAttempt) {
        if (!unit.exam) throw Error('Cannot attempt unit without exam!'); // todo: avoid using generic error
        unitAttempt.examAttempt = {examInfo: unit.exam.examInfo, status: STATUSES.PENDING};
    };

    // todo si tiene alguna unidad in progress fallar diciendo q ya tiene una unidad en progreso
    // todo si no tiene ninguna unidad in progress validar si la unit order number que quiere arrancar es la
    //  siguiente a la ultima que esta en estado PASSED, secuencialidad necesaria??
    challengeAttempt.unitsAttempts.forEach(unitAttempt => {
        if (unitAttempt.unitInfo.orderNumber == unitOrderNumber) {
            unitAttempt.status = STATUSES.IN_PROGRESS;
            addLessonsAttempts(unitAttempt);
            addExamAttempt(unitAttempt);
        }
    });

    return challengeAttempt.save();
};

const attemptExam = async (challengeAttemptId, unitOrderNumber) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt does not exist or it is not in progress'); // todo: avoid using generic error

    const unitAttempt = attemptsInProgress[0].unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.orderNumber == unitOrderNumber);

    if (!unitAttempt) {
        throw Error(`Unit with order number ${unitOrderNumber} not found`); // todo: avoid using generic error
    }

    unitAttempt.lessonsAttempts.forEach(lessonAttempt => {
        if (lessonAttempt.status !== STATUSES.PASSED) {
            throw Error('Lessons uncompleted yet'); // todo: avoid using generic error
        }
    });

    const challengeAttempt = attemptsInProgress[0];
    const challenge = await challengeModel.findOne({_id: challengeAttempt.challengeId});

    const exam = challenge.units.find(unit => unit.unitInfo.orderNumber == unitOrderNumber)?.exam;
    const examAttempt = unitAttempt.examAttempt;
    exam.exercises.forEach(exercise => {
        examAttempt.exercisesAttempts.push({
           exercise: exercise,
        });
    });
    examAttempt.status = STATUSES.IN_PROGRESS;

    return challengeAttempt.save();
}

const attemptLesson = async(challengeAttemptId, unitOrderNumber, lessonOrderNumber) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt does not exist or it is not in progress'); // todo: avoid using generic error

    const challengeAttempt = attemptsInProgress[0];

    const unitAttempt = challengeAttempt.unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.orderNumber == unitOrderNumber);
    if (!unitAttempt) {
        throw Error(`Unit with order number ${unitOrderNumber} not found`); // todo: avoid using generic error
    } else if (unitAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Unit is not in progress'); // todo: avoid using generic error
    }

    const lessonAttempt = unitAttempt.lessonsAttempts.find(lessonAttempt => lessonAttempt.lessonInfo.orderNumber === lessonOrderNumber);
    if (!lessonAttempt) {
        throw Error(`Lesson with order number ${lessonOrderNumber} not found`); // todo: avoid using generic error
    }

    const challenge = await challengeModel.findOne({_id: attemptsInProgress[0].challengeId});
    const lesson = challenge.units.find(unit => unit.unitInfo.orderNumber == unitOrderNumber).lessons.
        find(lesson => lesson.lessonInfo.orderNumber === lessonOrderNumber);

    lesson.exercises.forEach(exercise => {
        lessonAttempt.exercisesAttempts.push({
            exercise: exercise
        });
    });
    lessonAttempt.status = STATUSES.IN_PROGRESS;

    return challengeAttempt.save();
}

const attemptExamExercise = async(challengeAttemptId, unitOrderNumber, exerciseOrderNumber, answer) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt does not exist or it is not in progress'); // todo: avoid using generic error

    const challengeAttempt = attemptsInProgress[0];

    const unitAttempt = challengeAttempt.unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.orderNumber == unitOrderNumber);
    if (!unitAttempt) {
        throw Error(`Unit with order number ${unitOrderNumber} not found`); // todo: avoid using generic error
    } else if (unitAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Unit is not in progress'); // todo: avoid using generic error
    } else if (unitAttempt.examAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Exam is not in progress'); // todo: avoid using generic error
    }

    if (!unitAttempt.examAttempt) {
        throw Error('Exam not found'); // todo: avoid using generic error
    } else if (unitAttempt.examAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Exam is not in progress'); // todo: avoid using generic error
    }

    const exerciseAttempt = unitAttempt.examAttempt.exercisesAttempts[exerciseOrderNumber];
    if (!exerciseAttempt) throw Error('Exercise not found'); // todo: avoid using generic error

    const correctAnswer = exerciseAttempt.exercise.options.find(option => option.correct === true).text;
    if (answer === correctAnswer) {
        exerciseAttempt.status = STATUSES.PASSED;
    } else {
        exerciseAttempt.status = STATUSES.FAILED;
    }

    exerciseAttempt.optionAnswered = answer;

    return challengeAttempt.save();
};

const attemptLessonExercise = async(challengeAttemptId, unitOrderNumber, lessonOrderNumber, exerciseOrderNumber, answer) => {
    const attemptsInProgress = await challengeAttemptModel.find({_id: challengeAttemptId, status: STATUSES.IN_PROGRESS});
    if (attemptsInProgress.length === 0) throw Error('Challenge attempt does not exist or it is not in progress'); // todo: avoid using generic error

    const challengeAttempt = attemptsInProgress[0];

    const unitAttempt = challengeAttempt.unitsAttempts.find(unitAttempt => unitAttempt.unitInfo.orderNumber == unitOrderNumber);
    if (!unitAttempt) {
        throw Error(`Unit with order number ${unitOrderNumber} not found`); // todo: avoid using generic error
    } else if (unitAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Unit is not in progress'); // todo: avoid using generic error
    } else if (unitAttempt.examAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Exam is not in progress'); // todo: avoid using generic error
    }

    const lessonAttempt = unitAttempt.lessonsAttempts.find(lessonAttempt => lessonAttempt.lessonInfo.orderNumber == lessonOrderNumber);
    if (!lessonAttempt) {
        throw Error(`Lesson with order number ${lessonOrderNumber} not found`); // todo: avoid using generic error
    } else if (lessonAttempt.status !== STATUSES.IN_PROGRESS) {
        throw Error('Lesson is not in progress');  // todo: avoid using generic error
    }

    const exerciseAttempt = lessonAttempt.exercisesAttempts[exerciseOrderNumber];
    if (!exerciseAttempt) throw Error('Exercise not found'); // todo: avoid using generic error

    const correctAnswer = exerciseAttempt.exercise.options.find(option => option.correct === true).text;
    if (answer === correctAnswer) {
        exerciseAttempt.status = STATUSES.PASSED;
    } else {
        exerciseAttempt.status = STATUSES.FAILED;
    }

    exerciseAttempt.optionAnswered = answer;

    return challengeAttempt.save();
};

module.exports = {
    attemptChallenge,
    attemptUnit,
    attemptExam,
    attemptLesson,
    attemptExamExercise,
    attemptLessonExercise
};
