const Joi = require('Joi');
const crypto = require('crypto');
const async = require('async');
const Boom = require('boom');

var User = require('../../models/User');

function cypherPassword (password, cb) {
    const key = 'ortho-api';
    var hash = crypto.createHmac('sha512', key);
    hash.update(password);
    var value = hash.digest('hex');
    cb(null, value);
}

exports.connect = {
    description: 'Log in a user',
    notes: 'Returns the User object if the credentials are correct else returns false',
    tags: ['api'],
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        var email = request.payload.email;
        var password = request.payload.password;

        async.waterfall([
            function doCypherPassword (callback) {
                cypherPassword(password, function (err, hash_password) {
                        password = hash_password;
                        callback();
                    }
                );
            },
            function requestDatabase (callback) {
                // try to find the user thanks to the email and the password given
                User.findOne({ email: email, password: password }, function (err, user) {
                    if (err) {
                        return callback(err);
                    }
                    if(user == null){
                        return callback(Boom.notFound('No user with these credentials'));
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