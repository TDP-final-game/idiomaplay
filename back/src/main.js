const connectToMongo = require('./startup/db');
const app = require('./app');
 
const main = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

  connectToMongo();
};
 
if (require.main === module) {
  main();
}
