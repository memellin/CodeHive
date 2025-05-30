const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // remove os logos do sequelize
    dialectOptions: {
        //  ssl:  false, // para conexoes ssl(ex: heroku)
    ssl: {   require: true, // Necessário para Heroku
            rejectUnauthorized: false // Necessário para evitar erro de certificado não confiável
    }
    },
    // Esta linha é crucial: diz ao Sequelize para passar a flag SSL ao driver pg
    ssl: true
});

module.exports = sequelize;