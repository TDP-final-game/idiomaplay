const express = require('express');
const routers = require('./routers/index');
const generateOpenapi = require('./openapi/generate');

module.exports = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());

    /*
     * Api
     */
    app.use('/api/v1', routers);

    /*
     * Health
     */
    app.get('/healthz', function (req, res) {
        res.send("hi!");
    });

    /*
     * Openapi
     */
    app.use('/api-docs', await generateOpenapi())

    return app;
}
