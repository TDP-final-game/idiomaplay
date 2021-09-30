const swaggerAutogen = require('swagger-autogen')();
const doc = require('./doc.json');

module.exports = async () => {
  await swaggerAutogen('src/openapi/spec.json', ['src/app.js'], doc);
  return require('./router')
}
