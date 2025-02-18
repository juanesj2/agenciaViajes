import express from "express";
import {
    paginaInicio,
    paginaTestimonios,
    paginaViajes,
    paginaDetallesViajes,
    guardarTestimonios,
    guardarMapa
} from "../controllers/paginaController.js";
import {paginaNosotros} from "../controllers/paginaController.js";

const router = express.Router();

router.get('/viajes/:slug', paginaDetallesViajes);

router.get('/', paginaInicio);

router.get("/nosotros", paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/testimonios', paginaTestimonios);

router.post('/testimonios', guardarTestimonios);

router.post('/guardarMapa', guardarMapa);

export default router;

//"start": "index.js"