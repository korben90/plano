const Joi = require('Joi');
const async = require('async');
const Boom = require('boom');

var User = require('models/User');

exports.get = {
    description: 'Get the settings for an user',
    notes: 'Returns a Settings object for the matching user',
    tags: ['api'],
    validate: {
        params: {
            id : Joi.string().required()
                .description('the id for the User object')
        }
    },
    handler: function(request, reply) {
        var user_id = request.params.id;

        async.waterfall([
            function requestDatabase (callback) {
                // try to find the user thanks to the email and the password given
                User.findOne({ _id: user_id }, ['settings'], function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    if(user == null){
                        return callback(Boom.notFound('No user with this id'));
                    }
                    callback(null, user);
                });
            }
        ], function (err, user){
            if(err) {
                return reply(err);
            }
            return reply(user.settings);
        });
    }
};