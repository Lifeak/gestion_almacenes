'use strict';

if ('production' === process.env.NODE_ENV)
    require('newrelic');

const PORT = process.env.PORT || 3333;

const os = require('os');
const express = require('express');
const RoutesConfig = require('./server/config/routes.conf');
const DBConfig = require('./server/config/db.conf');
const Routes = require('./server/routes/index');

const app = express();
const server = app.listen(PORT);
DBConfig.init();
RoutesConfig.init(app, express);

Routes.init(app, express.Router());
console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
console.log(`enviroment: ${process.env.NODE_ENV}`);
