import api, { authenticate } from './api';
import registerForPushNotificationsAsync from './pushNotificationService';

async function createUser(firstName, lastName, email) {

  const expoPushToken = await registerForPushNotificationsAsync();
  const response = await api.post('/users', { firstName, lastName, email, expoPushToken });
  authenticate(response.data.id);
  return response.data;
}

async function logIn(email) {

  const expoPushToken = await registerForPushNotificationsAsync();
  const response = await api.post('/users/session', { email,  expoPushToken });
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
  updateStats};
