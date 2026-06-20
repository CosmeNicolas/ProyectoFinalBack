import { Router } from 'express';
import {
  listarProductos,
  obtenerProducto,
  publicarProducto,
  modificarProducto,
  borrarProducto,
} from '../controllers/productos.controller.js';

const router = Router();

router.get('/', listarProductos);
router.post('/', publicarProducto);
router.get('/:id', obtenerProducto);
router.patch('/:id', modificarProducto);
router.delete('/:id', borrarProducto);

export default router;
