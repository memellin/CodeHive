"use strict";

var express = require('express');

var dotenv = require('dotenv');

var sequelize = require('./src/config/database');

var snippetRoutes = require('./src/route/snippetRoutes');

var cors = require('./src/config/cors');

dotenv.config();
var app = express();
app.use(cors);
app.use(express.json()); // Sincronizar modelos com o banco de dados

sequelize.sync({
  force: false
}) // force: true recria as tabelas
.then(function () {
  return console.log('Banco de dados sincronizado');
})["catch"](function (err) {
  return console.error('Erro ao sincronizar banco de dados:', err);
}); // Rotas

app.use('/api/snippets', snippetRoutes); // Rota teste

app.get("/", function (req, res) {
  res.send("API CodeHive funcionando!");
});
var PORT = 3000; // Inicia o servidor

app.listen(PORT, function () {
  console.log("Server is running on port: ".concat(PORT));
});