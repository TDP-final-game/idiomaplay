const chai = require('chai');
const expect = chai.expect;
const createChallenge = require('../../src/startup/createChallenge')
const STATUSES = require('../../src/constants/statuses.json');

describe('/challengeAttempts', function() {
  describe('POST /', function() {
    it('should create a challenge attempt', async function() {
      const challenge = (await createChallenge()).toObject()
      const result = await this.app
        .post('/api/v1/challengeAttempts')
        .send({
          "challengeId": challenge._id
        })

      expect(result).to.have.status(200);

      const challengeAttempt = result.body;
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
});
