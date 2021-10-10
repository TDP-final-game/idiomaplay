const chai = require('chai');
const expect = chai.expect;
const ChallengeExample = require('./support/challenge')
const ChallengeAttemptExample = require('./support/challengeAttempt')
const STATUSES = require('../../src/constants/statuses.json');

describe('/challengeAttempts', function () {
  let challenge;
  let challengeAttemptReq;
  let unitAttemptReq;

  beforeEach(async function () {
    const challengeExample = new ChallengeExample(this.app)
    const challengeAttemptExample = new ChallengeAttemptExample(this.app)

    challenge = await challengeExample.create()
    challengeAttemptReq = await challengeAttemptExample.create({challengeId: challenge._id})
    unitAttemptReq = await challengeAttemptExample.attemptUnit({
      challengeId: challenge._id,
      unitOrderNumber: challenge.units[0].orderNumber
    })
  })

  describe('POST /', function () {
    it('should create a challenge attempt', async function () {
      expect(challengeAttemptReq).to.have.status(200);

      const challengeAttempt = challengeAttemptReq.body;
      expect(challengeAttempt.name).to.eql(challenge.name)
      expect(challengeAttempt.difficulty).to.eql(challenge.difficulty)
      expect(challengeAttempt.description).to.eql(challenge.description)
      expect(challengeAttempt.status).to.eql(STATUSES.IN_PROGRESS)

      const unit = challenge.units[0];
      const unitAttempt = challengeAttempt.unitsAttempts[0];
      expect(unitAttempt.orderNumber).to.eql(unit.orderNumber)
      expect(unitAttempt.name).to.eql(unit.name)
      expect(unitAttempt.description).to.eql(unit.description)
      expect(unitAttempt.status).to.eql(STATUSES.PENDING)
      expect(unitAttempt.lessonsAttempts).to.eql([])
    });
  });

  describe('PUT /:challengeAttemptId', function () {
    it('should change the unit attempt to "in progress"', async function () {
      expect(unitAttemptReq).to.have.status(200);

      const unitAttempt = unitAttemptReq.body;
      const unit = challenge.units[0];
      expect(unitAttempt.name).to.eql(unit.name)
      expect(unitAttempt.description).to.eql(unit.description)
      expect(unitAttempt.orderNumber).to.eql(unit.orderNumber)
      expect(unitAttempt.status).to.eql(STATUSES.IN_PROGRESS)

      const lessonAttempt = unitAttempt.lessonsAttempts[0]
      const lesson = unit.lessons[0]
      expect(lessonAttempt.name).to.eql(lesson.name)
      expect(lessonAttempt.description).to.eql(lesson.description)
      expect(lessonAttempt.orderNumber).to.eql(lesson.orderNumber)
      expect(lessonAttempt.status).to.eql(STATUSES.PENDING)
      expect(lessonAttempt.exercisesAttempts).to.eql([])

      const examAttempt = unitAttempt.examAttempt
      const exam = unit.exam
      expect(examAttempt.name).to.eql(exam.name)
      expect(examAttempt.description).to.eql(exam.description)
      expect(examAttempt.orderNumber).to.eql(exam.orderNumber)
      expect(examAttempt.durationInMinutes).to.eql(exam.durationInMinutes)
      expect(examAttempt.status).to.eql(STATUSES.PENDING)
    });
  });
});
