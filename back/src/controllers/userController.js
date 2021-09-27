const userService = require('../services/userService');

const createUser = (req, res, next) => {
    return userService
      .createUser(req.body)
      .then(data => res.status(200).json(data))
      .catch(next);
};

module.exports = { createUser };
