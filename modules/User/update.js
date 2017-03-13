const Joi = require('Joi');
const async = require('async');
const Boom = require('boom');

var User = require('../../models/User');

exports.update = {
    description: 'Update a user',
    notes: 'Returns the User object matching the id passed in the path after the modifications',
    tags: ['api'],
    validate: {
        params: {
            id : Joi.required()
                .description('the id for the User object')
        }
    },
    handler: function(request, reply) {
        var user_id = request.params.id;
        var data = request.payload;

        console.log(user_id);
        console.log(data);

        async.waterfall([
            function requestDatabase (callback) {
                // try to find the user thanks to the email and the password given
                User.findOne({ _id: user_id }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    if(user == null){
                        return callback(Boom.notFound('No user with this ID'));
                    }
                    callback(user);
                });
            },
            function updateUser (user, callback) {
                user.update(data, { safe: true }, function (err))
            }
        ], function (err, results){
            if(err) {
                return reply(err);
            }
            return reply(results);
        });
    }
};