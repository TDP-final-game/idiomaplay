import api from './api';

async function createUser(firstname, lastname, email) {
  const response = await api.post(
    '/users',
    { firstname, lastname },
    {
      header: email,
    }
  );

  console.log('HOLA ', response.data);

  return response.data.id;
}

async function logIn(email) {
  const response = await api.post(
    '/users/session',
    {},
    {
      header: email,
    }
  );

  console.log(response.data);

  return response.data.id;
}

export default {
  logIn: logIn,
  createUser: createUser,
};
