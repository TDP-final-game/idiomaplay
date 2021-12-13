import { create } from 'apisauce';

const api = create({
  baseURL: 'http://192.168.0.220:3001/api/v1',
});

export const authenticate = userId => {
  api.setHeader('Authorization', `userId ${userId}`);
}

export const deAuthenticate = () => {
  api.deleteHeader('Authorization');
}

export default api;
