import api from './api';

export default {
  getHealth: () => api.get('../../healthz')
}
