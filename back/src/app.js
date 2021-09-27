const express = require('express');
const routers = require('./routers/index');
 
const app = express();
app.use(express.json());

//app.use('/api', routers);

app.get('/healthz', function (req, res) {
    res.send("hi!");
});

module.exports = app;
