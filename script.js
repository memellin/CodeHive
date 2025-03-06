const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database');
const snippetRoutes = require('./src/route/snippetRoutes');
const cors = require('./src/config/cors');

dotenv.config();

const app = express();
app.use(cors);

app.use(express.json());

// Sincronizar modelos com o banco de dados
sequelize.sync({ force: false }) // force: true recria as tabelas
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

// Rotas
app.use('/api/snippets', snippetRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  

// Rota teste
app.get("/", (req, res) => {
    res.send("API CodeHive funcionando!")
})

const PORT = 3333;


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})