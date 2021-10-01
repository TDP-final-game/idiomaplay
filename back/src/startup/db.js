const mongoose = require("mongoose");

module.exports = function connectToMongo() {
  mongoose.connect(process.env.DATABASE_URL, {
    auth: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "db connection error: "));
  db.once("open", function () {
    console.log("db connected successfully");
  });
}
