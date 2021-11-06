import api from './api';
import { states } from '../config/states';
import { moduleTypes } from '../config/constants';

const EXAM_ORDER_NUMBER = -1;

const _allLessonsPassed = function (lessons) {
  return lessons.every((lesson) => lesson.status === states.passed);
};

const _attemptLesson = async (challengeAttemptId, unitOrderNumber, lessonOrderNumber) => {
  let lessonAttempt = (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts/${lessonOrderNumber}`
    )
  ).data;

  if (lessonAttempt.status === 'IN_PROGRESS') {
    return lessonAttempt.exercisesAttempts;
  }

  lessonAttempt = (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/lessonsAttempts`,
      { lessonOrderNumber }
    )
  ).data;

  return lessonAttempt.exercisesAttempts;
};

const _attemptExam = async (challengeAttemptId, unitOrderNumber) => {
  let examAttempt = (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempts`
    )
  ).data;

  if (examAttempt.status === 'IN_PROGRESS') {
    return examAttempt.exercisesAttempts;
  }

  examAttempt = (
    await api.put(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempts`
    )
  ).data;

  return examAttempt.exercisesAttempts;
};

async function getUnitModules(challengeAttemptId, unitOrderNumber) {
  const unitAttempt = (
    await api.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`)
  ).data;

  const lessons = unitAttempt.lessonsAttempts.map((lessonAttempt) => ({
    ...lessonAttempt,
    type: moduleTypes.LESSON,
    blocked: lessonAttempt.status === states.passed,
  }));

  const exam = (
    await api.get(
      `/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}/examAttempt`
    )
  ).data;

  exam.type = moduleTypes.EXAM;
  exam.orderNumber = EXAM_ORDER_NUMBER;
  exam.blocked = !_allLessonsPassed(lessons);

  return [...lessons, exam];
}

async function attemptUnitModule(challengeAttemptId, unitOrderNumber, moduleOrderNumber) {
  if (moduleOrderNumber === EXAM_ORDER_NUMBER)
    return _attemptLesson(challengeAttemptId, unitOrderNumber, moduleOrderNumber);
  else return _attemptExam(challengeAttemptId, unitOrderNumber);
}

async function allLessonsPassed(challengeAttemptId, unitOrderNumber) {
  const unitAttempt = (
    await api.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`)
  ).data;
  
  return _allLessonsPassed(unitAttempt.lessonsAttempts);
}

export default {
  getUnitModules,
  allLessonsPassed,
  attemptUnitModule,
};
