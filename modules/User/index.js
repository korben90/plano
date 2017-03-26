const Joi = require('Joi');
var connect = require('modules/User/connect');
var get = require('modules/User/get');
var update = require('modules/User/update');
var settings = require('modules/User/settings');

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

    server.route({
        path: '/users/{id}/settings',
        method: 'GET',
        config: settings.get
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};