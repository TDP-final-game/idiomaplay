const express = require('express');
const routers = require('./routers/index');
 
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1', routers);

app.get('/healthz', function (req, res) {
    res.send("hi!");
});

module.exports = app;
