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

export default {
  logIn,
  createUser,
};
