import express from 'express';
import cors from 'cors';
import { configuracion } from './config/variablesEntorno.js';
import rutasApi from './routes/index.js';
import { manejadorErrores } from './middlewares/manejadorErrores.js';
import { rutaNoEncontrada } from './middlewares/rutaNoEncontrada.js';

const aplicacion = express();

aplicacion.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
}));
aplicacion.use(express.json());

aplicacion.get('/', (solicitud, respuesta) => {
  respuesta.json({
    mensaje: 'API de Coquette — ecommerce de ropa usada',
    version: '1.0.0',
  });
});

aplicacion.use('/api', rutasApi);

aplicacion.use(rutaNoEncontrada);
aplicacion.use(manejadorErrores);

aplicacion.listen(configuracion.puerto, () => {
  console.log(`Servidor Coquette corriendo en http://localhost:${configuracion.puerto}`);
  console.log(`Entorno: ${configuracion.entorno}`);
});
