import { Router } from 'express';
import {
  listarCategorias,
  obtenerCategoria,
  registrarCategoria,
  modificarCategoria,
  borrarCategoria,
} from '../controllers/categorias.controller.js';

const router = Router();

router.get('/', listarCategorias);
router.post('/', registrarCategoria);
router.get('/:id', obtenerCategoria);
router.patch('/:id', modificarCategoria);
router.delete('/:id', borrarCategoria);

export default router;
