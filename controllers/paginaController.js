import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/testimoniales.js';

import moment from 'moment';
import {Model as Testimonio} from "sequelize";

const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try{
        const resultado= await Promise.all(promiseDB);
        res.render('inicio', {
            tituloT: 'Testimonios',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment
        });

    }catch (e) {
        console.log(e);
    }
}

const paginaNosotros = async (req, res) => {

    res.render('Nosotros', {
        titulo: 'Nosotros',
    });
}

const paginaViajes = async (req, res) => {
    //consultar BD
    const titulo = 'Viajes Disponibles'
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        titulo,
        viajes,
        moment: moment,
    });
}

const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            titulo: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    }catch(err) {
        console.error(err);
    }
}

const paginaDetallesViajes = async (req, res) => {
    const {slug} = req.params;

    try {
        const resultado = await Viaje.findOne({where: {slug:slug}});
        res.render('viaje', {
            titulo: 'Informacion del Viaje',
            resultado,
            moment: moment,
        });
    }catch(error) {
        console.log('Dato no encontrado');
    }
}

const guardarTestimonios = async (req, res) => {
    //Validar

    const {nombre, correoelectronico, mensaje}= req.body;

    const errores = [];

    if (nombre.trim() ===''){
        errores.push("el nombre está vacío")
    }
    if (correoelectronico.trim() ===''){
        errores.push( "el correo está vacío")
    }
    if (mensaje.trim() ===''){
        errores.push("el mensaje está vacío")
    }

    if (errores.length > 0){
        res.render('testimonios', {
            titulo: 'testimonios',
            errores: errores,
            nombre: nombre,
            correoelectronico: correoelectronico,
            mensaje: mensaje,
        });
    }else{ // Si me envia los 3 campos rellenos tengo que meterlo en la base de datos
        try {
            await Testimonial.create({nombre: nombre, correoelectronico: correoelectronico, mensaje: mensaje,});
            res.redirect('/testimonios');
        }catch(error){
            console.log(error);
        }
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetallesViajes,
    guardarTestimonios,
};