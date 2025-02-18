import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/testimoniales.js';
import {Mapa} from "../models/Mapa.js";

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

    res.render('nosotros', {
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

const guardarMapa  = async (req, res) => {
    const { titulo, latitud, longitud } = req.body;

    try {
        // Comprobar si el título ya existe en la base de datos
        const mapaExistente = await Mapa.findOne({ where: { titulo } });

        if (mapaExistente) {
            // Si el título ya existe, responder con un mensaje adecuado
            return res.json({ ok: false, mensaje: 'Ya existe un mapa con ese título' });
        }

        // Si no existe, crear el nuevo mapa
        await Mapa.create({ titulo, latitud, longitud });

        res.json({ ok: true, mensaje: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar en la base de datos:', error);
        res.json({ ok: false, mensaje: 'Hubo un problema al guardar los datos', error: error.message });
    }
}




export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetallesViajes,
    guardarTestimonios,
    guardarMapa
};