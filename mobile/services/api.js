import { create } from 'apisauce';

const api = create({
  baseURL: 'https://idiomaplay.herokuapp.com/api/v1',
});

export const authenticate = userId => {
  api.setHeader('Authorization', `userId ${userId}`);
}

export const deAuthenticate = () => {
  api.deleteHeader('Authorization');
}

export default api;
