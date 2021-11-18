import api, { authenticate } from './api';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


async function getExpoPushToken() {
  let experienceId = undefined;
  if (!Constants.manifest) {
    // Absence of the manifest means we're in bare workflow
    experienceId = '@username/example';
  }
  const expoPushToken = await Notifications.getExpoPushTokenAsync({
    experienceId,
  });

  return expoPushToken.data;
}
async function createUser(firstName, lastName, email) {

  const expoPushToken = await getExpoPushToken();
  const response = await api.post('/users', { firstName, lastName, email, expoPushToken:  expoPushToken });
  authenticate(response.data.id);
  return response.data;
}

async function logIn(email) {

  const expoPushToken = await getExpoPushToken();
  const response = await api.post('/users/session', { email,  expoPushToken:  expoPushToken });
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
