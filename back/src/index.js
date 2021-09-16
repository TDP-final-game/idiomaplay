const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

app.get('/', (req, res) => {
  res.send("Hello world!")
})
