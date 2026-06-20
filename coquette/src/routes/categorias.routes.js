import { Router } from 'express';
import {
  listarCategorias,
  registrarCategoria,
} from '../controllers/categorias.controller.js';

const router = Router();

router.get('/', listarCategorias);
router.post('/', registrarCategoria);

export default router;
