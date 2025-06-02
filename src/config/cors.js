// src/config/cors.js
const cors = require('cors');

// Configurações do CORS
const corsOptions = {
  origin: ['http://localhost:3333', 'http://localhost:3001', 'http://localhost:3000', 'https://code-hive-front-end-ike7.vercel.app/', 'https://code-hive-front-end-ike7-memellins-projects.vercel.app/', 'https://code-hive-front-end-ike7-git-main-memellins-projects.vercel.app/'], // Permitir apenas essas origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir cookies e autenticação (opcional)
};

module.exports = cors(corsOptions);