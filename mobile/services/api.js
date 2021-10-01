import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

const camelSerializer = new CamelcaseSerializer();
const snakeSerializer = new SnakecaseSerializer();

const api = create({
  baseURL: 'http://10.0.2.2:3000/api/v1'
});

api.addResponseTransform(response => {
  if (response.data) {
    response.data = camelSerializer.serialize(response.data);
  }
});

api.addRequestTransform(request => {
  if (request.data) {
    request.data = snakeSerializer.serialize(request.data);
  }
});

export default api;
