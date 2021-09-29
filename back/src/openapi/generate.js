const swaggerAutogen = require('swagger-autogen')();
const doc = require('./doc.json');

const outputFile = 'src/openapi/spec.json';
const endpointsFiles = ['src/app.js'];

module.exports = () => swaggerAutogen(outputFile, endpointsFiles, doc);
