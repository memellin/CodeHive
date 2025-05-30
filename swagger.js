const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CodeHive API',
        description: 'Documentação da API CodeHive',
    },
    host: 'localhost:3333',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/route/snippetRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js'); // project's root file
});

