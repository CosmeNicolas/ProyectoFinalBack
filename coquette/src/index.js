import express from 'express';
import { configuracion } from './config/variablesEntorno.js';
import rutasApi from './routes/index.js';
import { manejadorErrores } from './middlewares/manejadorErrores.js';
import { rutaNoEncontrada } from './middlewares/rutaNoEncontrada.js';

const aplicacion = express();

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
