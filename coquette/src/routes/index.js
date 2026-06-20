import { Router } from 'express';
import rutasUsuarios from './usuarios.routes.js';
import rutasProductos from './productos.routes.js';
import rutasCategorias from './categorias.routes.js';

const router = Router();

router.use('/usuarios', rutasUsuarios);
router.use('/productos', rutasProductos);
router.use('/categorias', rutasCategorias);

export default router;
