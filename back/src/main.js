const connectToMongo = require('./startup/db');
const createChallenge = require('./startup/createChallenge');
const appCallback = require('./app');

const main = async () => {
  const app = await appCallback()
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  connectToMongo();
  //createChallenge(); // todo: revisar esto porq al usar nodemon hace q todo el tiempo deletee la db!
};
 
if (require.main === module) {
  main();
}
