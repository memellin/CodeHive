"use strict";

var swaggerAutogen = require('swagger-autogen')();

var doc = {
  info: {
    title: 'CodeHive API',
    description: 'Documentação da API CodeHive'
  },
  host: 'localhost:3333',
  schemes: ['http']
};
var outputFile = './swagger-output.json';
var endpointsFiles = ['./src/route/snippetRoutes.js'];
swaggerAutogen(outputFile, endpointsFiles, doc).then(function () {
  require('./script.js'); // project's root file

});