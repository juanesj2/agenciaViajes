import express from 'express';
import router from './routers/index.js';
import db from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();
// Creamos una instancia de la aplicacion express.
const app = express();

// Conectar a la base de datos
db.authenticate()
    .then(()=> console.log('Conectado a la base de datos'))
    .catch(err=> console.log(err));

// Definimos el puerto enel que el servidor va a escuchar,
// Si hay una variable de entorno PORT, se usa esa, de lo contrario, se usa el
const port = process.env.PORT || 4000;


app.listen(port, () => console.log(`Server started on port ${port}`));

// Habilitar PUG
app.set('view engine', 'pug');

// Middleware global para definir el año
app.use((req,res,next)=>{
    const year = new Date().getFullYear();
    res.locals.year = year; // Esto agrega el año a res.locals
    res.locals.tituloR = "Agencia de Viajes"
    next();
});


// Definir la carpeta publica
app.use(express.static('public'));

// Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true })); // Para datos enviados desde formularios
app.use(express.json()); // Para datos enviados en JSON

// Agregamos router
app.use("/", router);

// "dev": "nodemon index.js"
// "start": "index.js"