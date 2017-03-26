const Joi = require('Joi');
const async = require('async');
const Boom = require('boom');

var User = require('models/User');

exports.get = {
    description: 'Get a user',
    notes: 'Returns the User object matching the id passed in the path',
    tags: ['api'],
    validate: {
        params: {
            id : Joi.required()
                .description('the id for the User object')
        }
    },
    handler: function(request, reply) {
        var user_id = request.params.id;

        async.waterfall([
            function requestDatabase (callback) {
                // try to find the user thanks to the email and the password given
                User.findOne({ _id: user_id }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    if(user == null){
                        return callback(Boom.notFound('No user with this id'));
                    }
                    callback(null, user);
                });
            }
        ], function (err, results){
            if(err) {
                return reply(err);
            }
            return reply(results);
        });
    }
};

exports.getAll = {
    description: 'Get a list of all registered users',
    notes: 'Returns a collection of User objects',
    tags: ['api'],
    handler: function(request, reply) {

        async.waterfall([
            function requestDatabase (callback) {
                // try to find the user thanks to the email and the password given
                User.find({}, function (err, users) {
                    if (err) {
                        return callback(err);
                    }
                    if(users == null){
                        return callback(Boom.notFound('No users'));
                    }
                    callback(null, users);
                });
            }
        ], function (err, results){
            if(err) {
                return reply(err);
            }
            return reply(results);
        });
    }
};