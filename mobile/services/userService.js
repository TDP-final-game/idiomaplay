import api, { authenticate } from './api';
import registerForPushNotificationsAsync from './pushNotificationService';

const TOO_MANY_LIVES_ERROR = 'Has alcanzado el limite de 5 vidas!';
const NOT_ENOUGHT_MONEY_ERROR = 'No tiene las monedas suficientes!';

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

async function buyLives() {
  const errorTranslator = {
    'Max lives already reached': TOO_MANY_LIVES_ERROR,
    'Not enough coins to exchange for a live': NOT_ENOUGHT_MONEY_ERROR,
  };

  const response = await api.put('/users/me/exchanges');

  if (response.status === 400) {
    return { ok: false, message: errorTranslator[response.data.message] };
  }

  return { ok: true, stats: response.data };
}

export default {
  logIn,
  buyLives,
  createUser,
  updateStats,
};
