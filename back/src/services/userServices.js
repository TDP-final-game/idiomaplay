const Challenge = require('../model/domain/challenge');
const UserChallenge = require('../model/user/userChallenge');
const STATUSES = require('../utils/statuses.json')

const mongoose = require('mongoose');

const createUserLesson = (lesson, userId) => {
    
    const { exercises: lessonExercises } = lesson;
    const userLessonExercises = lessonExercises.map(lessonExercise => ({ exercise: lessonExercise, userId, status: STATUSES.PENDING }));
    return { lesson, status: STATUSES.PENDING, userId, userExercises: userLessonExercises };
};

const createUserExam = (exam, userId) => { 
    
    const { exercises: examExercises } = exam; 
    const userExamExercises = examExercises.map(examExercise => ({ exercise: examExercise, userId, status: STATUSES.PENDING }));
    return  { userId, exam, status: STATUSES.PENDING, userExercises: userExamExercises };
};

const createUserUnit = (unit, userId) => {
    
    const { lessons , exam } = unit;
    const userLessons = lessons.map(lesson => createUserLesson(lesson, userId));
    const userExam = createUserExam(exam, userId);
    return { exam: userExam, userLessons, unit, userId, status: STATUSES.PENDING };
};

const startChallenge = async (challengeId, userId) => {
	
    console.log(challengeId, userId) ;

    const challengeModel = mongoose.model('challenge', Challenge);
    const challenge = await challengeModel.findOne({_id: challengeId} );
    const { units } = challenge;
    const userUnits = units.map(unit => createUserUnit(unit, userId));
    const userChallenge =  { userId, userUnits, challenge, units };

    const userChallengeModel = mongoose.model('user-challenge', UserChallenge);
    return userChallengeModel.create(userChallenge);
};

const itIsInProgress = items => {
    return items && Array.isArray(items) && items.length != 0;
};

const startUnit = async challengeId => {

    const userChallengeModel = mongoose.model('user-challenge', UserChallenge);
    const userChallenge = await userChallengeModel.findOne({ 'challenge._id': challengeId });

    const inPogressUnits = userChallenge.userUnits.filter(userUnit => userUnit.status === STATUSES.IN_PROGRESS);

    if(itIsInProgress(inPogressUnits))
        throw Error('There is a Unit In Progress'); // TODO update this message;

    const pendingUnits = userChallenge.userUnits.filter(userUnit => userUnit.status === STATUSES.PENDING);
    let minOrderNumber = Math.min(...pendingUnits.map(userUnit => userUnit.unit.orderNumber));
    let [nextUnit] = pendingUnits.filter(userUnit => userUnit.unit.orderNumber === minOrderNumber)
	
    console.log(nextUnit);
    nextUnit.status = STATUSES.IN_PROGRESS;

    return userChallenge.save();
};

const startLesson = async challengeId => {

    const userChallengeModel = mongoose.model('user-challenge', UserChallenge);
    const userChallenge = await userChallengeModel.findOne({'challenge._id': challengeId });

    const inPogressUnits = userChallenge.userUnits.filter(userUnits => userUnits.status === STATUSES.IN_PROGRESS);

    if(!itIsInProgress(inPogressUnits))
        throw Error('No Unit is In Progress'); // TODO update this message;

    const [userUnit] = inPogressUnits;

    const inPogressLessons = userUnit.userLessons.filter(userLesson => userLesson.status === STATUSES.IN_PROGRESS);

    if(itIsInProgress(inPogressLessons))
        throw Error('There is a Lesson In Progress'); // TODO update this message

    const pendingLessons = userUnit.userLessons.filter(userLesson => userLesson.status === STATUSES.PENDING);
    let minOrderNumber = Math.min(...pendingLessons.map(userLesson => userLesson.lesson.orderNumber));
    let [nextlesson] = pendingLessons.filter(userLesson => userLesson.lesson.orderNumber === minOrderNumber)
	
    nextlesson.status = STATUSES.IN_PROGRESS;

    return userChallenge.save();
};

const getExerciseToComplete = async challengeId => {
	
    const userChallengeModel = mongoose.model('user-challenge', UserChallenge);
    const userChallenge = await userChallengeModel.findOne({'challenge._id': challengeId });
    const [userUnit] = userChallenge.userUnits.filter(userUnit => userUnit.status === STATUSES.IN_PROGRESS); // TODO agregar para validar
    const [userLesson] = userUnit.userLessons.filter(userLesson => userLesson.status === STATUSES.IN_PROGRESS); // TODO agregar para validar
    
    const inProgressUserLessonExercices = userLesson.userExercises.filter(userExercise => userExercise.status === STATUSES.IN_PROGRESS);

    if(itIsInProgress(inProgressUserLessonExercices)) 
        throw Error('There is an exercise In Progress'); // TODO update this message

    const [pendingUserLessonExercices] = userLesson.userExercises.filter(userLesson => userLesson.status === STATUSES.PENDING);

    pendingUserLessonExercices.status = STATUSES.IN_PROGRESS;

    return userChallenge.save();
};

const saveUserExerciseSolution = async (challengeId, exerciseId) => {
    const userChallengeModel = mongoose.model('user-challenge', UserChallenge);
    const userChallenge = await userChallengeModel.findOne({'challenge._id': challengeId });
    const [userUnit] = userChallenge.userUnits.filter(userUnit => userUnit.status === STATUSES.IN_PROGRESS); // TODO agregar para validar
    const [userLesson] = userUnit.userLessons.filter(userLesson => userLesson.status === STATUSES.IN_PROGRESS); // TODO agregar para validar
    

    console.log(userLesson)

    const userExercises = userLesson.userExercises.filter(userExercise => userExercise._id = exerciseId);

    console.log(userExercises)

    if(!(userExercises && Array.isArray(userExercises) && userExercises.length != 0 ))
        throw Error('Exercise Not Found'); // TODO update this message

    userExercises[0].status = STATUSES.PASSED;
    return userChallenge.save();
};

module.exports = { 
	startChallenge,
    startUnit,
    startLesson,
    getExerciseToComplete,
    saveUserExerciseSolution
};