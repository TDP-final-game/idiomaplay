import api from './api';
import { states } from '../config/states';
import { moduleTypes } from '../config/constants';

const _allLessonsPassed = function (lessons) {
  return lessons.every((lesson) => lesson.status === states.passed);
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

  exam.orderNumber = -1;
  exam.type = moduleTypes.EXAM;
  exam.blocked = !_allLessonsPassed(lessons);

  return [...lessons, exam];
}

async function attemptLesson(challengeAttemptId, unitOrderNumber, lessonOrderNumber) {
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
}

async function allLessonsPassed(challengeAttemptId, unitOrderNumber) {
  const unitAttempt = (
    await api.get(`/challengeAttempts/${challengeAttemptId}/unitsAttempts/${unitOrderNumber}`)
  ).data;
  return _allLessonsPassed(unitAttempt.lessonsAttempts);
}

export default {
  getUnitModules,
  attemptLesson,
  allLessonsPassed,
};
