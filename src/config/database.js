const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // remove os logos do sequelize
    dialectOptions: {
        //  ssl:  false, // para conexoes ssl(ex: heroku)
        require: true, // Necessário para Heroku
    }
});

module.exports = sequelize;