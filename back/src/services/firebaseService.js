'use strict';

const admin = require('../startup/firebase')();

const getUserInformation = token => admin.auth().verifyIdToken(token)
	.then(user => { return user; });

module.exports = {
	getUserInformation
};
