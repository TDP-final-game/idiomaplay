'use strict';

const admin = require('firebase-admin');

const firebase = admin.initializeApp({
	credential: admin.credential.cert({
		type: process.env.FIREBASE_CREDENTIAL_TYPE,
		project_id: process.env.FIREBASE_CREDENTIAL_PROJECT_ID,
		private_key_id: process.env.FIREBASE_CREDENTIAL_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_CREDENTIAL_PRIVATE_KEY,
		client_email: process.env.FIREBASE_CREDENTIAL_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CREDENTIAL_CLIENT_ID,
		auth_uri: process.env.FIREBASE_CREDENTIAL_AUTH_URI,
		token_uri: process.env.FIREBASE_CREDENTIAL_TOKEN_URI,
		auth_provider_x509_cert_url: process.env.FIREBASE_CREDENTIAL_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.FIREBASE_CREDENTIAL_CLIENT_X509_CERT_URL
	})
});

module.exports = firebase;
