// app.js (seu arquivo principal do Express)
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const cors = require('./src/config/cors');

// --- Importação das Rotas ---
// authRoutes agora contém registro, login tradicional e login OAuth
const authRoutes = require('./src/route/authRoutes'); 
// Importe a rota de snippets
const snippetRoutes = require('./src/route/snippetRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();

// --- Middlewares Globais ---
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Montagem das Rotas ---
// Todas as rotas de autenticação (tradicional e OAuth) serão montadas sob '/api'
// Isso significa que:
// - POST /api/register
// - POST /api/login
// - POST /api/oauth-login
app.use('/api', authRoutes);

// Monta as rotas de snippets sob o prefixo '/api'
app.use('/api', snippetRoutes);

// Rota de documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota de teste
app.get("/", (req, res) => {
    res.send("API CodeHive funcionando!")
});

// --- Inicialização do Servidor e Sincronização do Banco de Dados ---
async function startApplication() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync({ force: false });
        console.log('Banco de dados sincronizado');

        const PORT = process.env.PORT || 3333;

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.error('Erro ao iniciar a aplicação ou conectar ao banco de dados:', err);
    }
}

startApplication();