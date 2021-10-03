const userService = require('../services/userService');
const STATUS_CODES = require('../constants/status_codes');

const listChallengesAttempts = async (req, res) => {
  try {
      const { userId } = req.params;
      const response = await userService.listChallengeAttempts(userId);
      res.status(STATUS_CODES.OK)
          .send(response);
  } catch(error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

module.exports = { 
 listChallengesAttempts
};
