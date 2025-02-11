import sequelize, {Sequelize} from 'sequelize';
import db from '../config/db.js';

export const Testimonial = db.define('testimoniales', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING
    },
    correoelectronico: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }},
{tablename: 'testimoniales',
});

Testimonial.sync({alter: true}).catch(console.error);