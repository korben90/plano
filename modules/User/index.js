const Joi = require('Joi');
var connect = require('./connect');
var get = require('./get');
var update = require('./update');

exports.register = function (server, options, next) {

    server.route({
        path: '/user/log',
        method: 'POST',
        config:
            connect.connect
    });

    server.route({
        path: '/users',
        method: 'GET',
        config: get.getAll
    });

    server.route({
        path: '/users/{id}',
        method: 'GET',
        config: get.get
    });

    server.route({
        path: '/users/{id}',
        method: 'PUT',
        config: update.update
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};