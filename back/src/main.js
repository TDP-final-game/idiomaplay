const connectToMongo = require('./startup/db');
const createChallenge = require('./startup/createChallenge');
const appCallback = require('./app');

const main = async () => {
  const app = await appCallback()
  const port = process.env.PORT || 3000;
  const result = await app.listen(port);

  await connectToMongo();

  if (process.env['CREATE_CHALLENGE']) {
    await createChallenge();
  }

  return result;
};
 
if (require.main === module) {
  main();
}

module.exports = main;
