const chai = require('chai');
const expect = chai.expect;
const ChallengeExample = require('./support/challenge')
const ChallengeAttemptExample = require('./support/challengeAttempt')
const STATUSES = require('../../src/constants/statuses.json');

const compare = ({properties, obj1, obj2}) => {
  properties.forEach(property => {
    expect(obj1[property]).to.eql(obj2[property])
  })
}

const correctAnswer = (exercise) =>
  exercise.options.find(option => option.correct).text

describe('/challengeAttempts', function () {
  let challenge;
  let challengeAttemptReq;
  let unitAttemptReq;
  let lessonAttemptReq;
  let lessonExercisesAttemptReq;
  let examAttemptReq;

  beforeEach(async function () {
    const challengeExample = new ChallengeExample(this.app)
    const challengeAttemptExample = new ChallengeAttemptExample(this.app)

    challenge = await challengeExample.create()
    challengeAttemptReq = await challengeAttemptExample.create({challengeId: challenge._id})
    unitAttemptReq = await challengeAttemptExample.attemptUnit({
      challengeId: challenge._id,
      unitOrderNumber: challenge.units[0].orderNumber
    })
    lessonAttemptReq = await challengeAttemptExample.attemptLesson({
      challengeId: challenge._id,
      unitOrderNumber: challenge.units[0].orderNumber,
      lessonOrderNumber: challenge.units[0].lessons[0].orderNumber
    })

    lessonExercisesAttemptReq = await Promise.all(challenge.units[0].lessons[0].exercises.map((exercise, n) =>
      challengeAttemptExample.attemptLessonExercise({
        challengeId: challenge._id,
        unitOrderNumber: challenge.units[0].orderNumber,
        lessonOrderNumber: challenge.units[0].lessons[0].orderNumber,
        exerciseOrderNumber: n,
        answer: correctAnswer(exercise)
      })
    ))
  })

  describe('POST /', function () {
    it('should create a challenge attempt', async function () {
      expect(challengeAttemptReq).to.have.status(200);

      const challengeAttempt = challengeAttemptReq.body;
      compare({
        properties: ['name', 'difficulty', 'description'],
        obj1: challengeAttempt,
        obj2: challenge
      });
      expect(challengeAttempt.status).to.eql(STATUSES.IN_PROGRESS)

      const unit = challenge.units[0];
      const unitAttempt = challengeAttempt.unitsAttempts[0];
      compare({
        properties: ['name', 'orderNumber', 'description'],
        obj1: unitAttempt,
        obj2: unit
      });
      expect(unitAttempt.status).to.eql(STATUSES.PENDING)
      expect(unitAttempt.lessonsAttempts).to.eql([])
    });
  });

  describe('PUT /:challengeAttemptId/unitsAttempts', function () {
    it('should change the unit attempt to "in progress"', async function () {
      expect(unitAttemptReq).to.have.status(200);

      const unitAttempt = unitAttemptReq.body;
      const unit = challenge.units[0];
      compare({
        properties: ['name', 'orderNumber', 'description'],
        obj1: unitAttempt,
        obj2: unit
      });
      expect(unitAttempt.status).to.eql(STATUSES.IN_PROGRESS)

      const lessonAttempt = unitAttempt.lessonsAttempts[0]
      const lesson = unit.lessons[0]
      compare({
        properties: ['name', 'orderNumber', 'description'],
        obj1: lessonAttempt,
        obj2: lesson
      });
      expect(lessonAttempt.status).to.eql(STATUSES.PENDING)
      expect(lessonAttempt.exercisesAttempts).to.eql([])

      const examAttempt = unitAttempt.examAttempt
      const exam = unit.exam
      compare({
        properties: ['name', 'orderNumber', 'description', 'durationInMinutes'],
        obj1: examAttempt,
        obj2: exam
      });
      expect(examAttempt.status).to.eql(STATUSES.PENDING)
    });
  });

  describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', function () {
    it('should change the lesson attempt to "in progress"', async function () {
      expect(lessonAttemptReq).to.have.status(200);

      const lessonAttempt = lessonAttemptReq.body;
      const lesson = challenge.units[0].lessons[0];
      compare({
        properties: ['name', 'orderNumber', 'description'],
        obj1: lessonAttempt,
        obj2: lesson
      });
      expect(lessonAttempt.status).to.eql(STATUSES.IN_PROGRESS)

      const exerciseAttempt = lessonAttempt.exercisesAttempts[0];
      const exercise = lesson.exercises[0];
      compare({
        properties: ['type', 'statement', 'options'],
        obj1: exerciseAttempt,
        obj2: exercise
      });
      expect(exerciseAttempt.status).to.eql(STATUSES.PENDING)
    });
  });

  describe('PUT /:challengeAttemptId/unitsAttempts/:unitOrderNumber/lessonsAttempts', function () {
    it('should change the lesson exercise attempt to "in progress"', async function () {
      const lessonExerciseAttemptReq = lessonExercisesAttemptReq[0]
      expect(lessonExerciseAttemptReq).to.have.status(200);

      const exerciseAttempt = lessonExerciseAttemptReq.body
      const exercise = challenge.units[0].lessons[0].exercises[0];
      compare({
        properties: ['type', 'statement', 'options'],
        obj1: exerciseAttempt,
        obj2: exercise
      });
      expect(exerciseAttempt.status).to.eql(STATUSES.PASSED)
      expect(exerciseAttempt.optionAnswered).to.eql(correctAnswer(exercise))
    });
  });
});
