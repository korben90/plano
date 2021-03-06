const Joi = require('Joi');
const async = require('async');
const Boom = require('boom');

var User = require('models/User');

exports.update = {
    description: 'Update a user',
    notes: 'Returns the User object matching the id passed in the path after the modifications',
    tags: ['api'],
    validate: {
        params: {
            id : Joi.required()
                .description('the id for the User object')
        },
        payload: {
            data: Joi.object().required(). description('The new data to update the user')
        }
    },
    handler: function(request, reply) {
        var user_id = request.params.id;
        var data = request.payload.data;

        async.waterfall([
            function findAndUpdate(callback) {
                User.findByIdAndUpdate(user_id, data, { new: true }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, user);
                });
            }
        ], function (err, user){
            if(err) {
                return reply(err);
            }
            return reply(user);
        });
    }
};