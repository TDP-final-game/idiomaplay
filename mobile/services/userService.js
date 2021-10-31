import api, {authenticate} from './api';

async function createUser(firstName, lastName, email) {
  const response = await api.post(
    '/users',
    { firstName, lastName },
    {
      headers: { authorization: email },
    }
  );

  authenticate(response.data.id)
  return response.data;
}

async function logIn(email) {
  const response = await api.post(
    '/users/session',
    {},
    {
      headers: { authorization: email },
    }
  );

  authenticate(response.data.id)
  return response.data;
}

export default {
  logIn,
  createUser,
};
