"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');
const contentLength = require('express-content-length-validator');
const helmet = require('helmet');
require('mongoose').Promise = require('bluebird');


module.exports = class RouteConfig {
    static init(application, exp) {
        let _root = process.cwd();
        let _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';
        let _cssfiles =(process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/styles/assets/';
        application.use(exp.static(_root));
        application.use(exp.static(_root + _clientFiles));
        application.use(exp.static(_root + _cssfiles));
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 999}));
        application.use(helmet());
    }
}
