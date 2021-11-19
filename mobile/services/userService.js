import api, { authenticate } from './api';

async function createUser(firstName, lastName, email) {
  const response = await api.post('/users', { firstName, lastName, email });
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

async function buyLives() {
  const response = await api.put('/users/me/exchanges');
  console.log('RESPONSE ', response);
  return response.data;
}

export default {
  logIn,
  buyLives,
  createUser,
  updateStats,
};
