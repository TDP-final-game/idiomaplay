const connectToMongo = require('./startup/db');
const appCallback = require('./app');

const main = async () => {
  const app = await appCallback()
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  connectToMongo();
};
 
if (require.main === module) {
  main();
}
