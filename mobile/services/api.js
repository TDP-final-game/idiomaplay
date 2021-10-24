import { create } from 'apisauce';

const api = create({
  baseURL: 'https://idiomaplay.herokuapp.com/api/v1',
});

export default api;
