import sequelize, {Sequelize} from 'sequelize';
import db from '../config/db.js';

export const Mapa = db.define('Mapa', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    latitud: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    longitud: {
        type: Sequelize.FLOAT,
        allowNull: false
    }},
    {tablename: 'Mapa',
});

Mapa.sync({alter: true}).catch(console.error);