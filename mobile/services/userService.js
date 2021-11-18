import api, { authenticate } from './api';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

async function createUser(firstName, lastName, email) {

  let experienceId = undefined;
  if (!Constants.manifest) {
    // Absence of the manifest means we're in bare workflow
    experienceId = '@username/example';
  }
  const expoPushToken = await Notifications.getExpoPushTokenAsync({
    experienceId,
  });

  const response = await api.post('/users', { firstName, lastName, email, expoPushToken:  expoPushToken.data });
  authenticate(response.data.id);
  return response.data;
}

async function logIn(email) {
  const response = await api.post('/users/session', { email });
  authenticate(response.data.id);
  return response.data;
}

async function updateStats() {
  const response = await api.get('/users/me/stats');
  return response.data;
}

export default {
  logIn,
  createUser,
  updateStats
};
