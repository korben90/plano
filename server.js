'use strict';

require('app-module-path').addPath(__dirname);

const Hapi = require('hapi');
const mongoose = require('mongoose');

var Glue = require('glue');
var manifest = require('manifest.json');
var options = {
    relativeTo: __dirname + '/modules'
};

mongoose.connect('mongodb://127.0.0.1/planortho');

Glue.compose(manifest, options, function (err, server) {
    server.start(function (err) {
        // server running on port 3000
        console.log('Api server running at:', server.connections[0].info.uri);
    });
});