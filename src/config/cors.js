// src/config/cors.js
const cors = require('cors');

// Configurações do CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir apenas essas origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true // Permitir cookies e autenticação (opcional)
};

module.exports = cors(corsOptions);