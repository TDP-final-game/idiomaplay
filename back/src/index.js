const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error: "));
db.once("open", function () {
  console.log("db connected successfully");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
