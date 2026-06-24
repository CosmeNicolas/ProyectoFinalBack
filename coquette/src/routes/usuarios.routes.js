import { Router } from 'express';
import {
  listarUsuarios,
  obtenerUsuario,
  loginUsuario,
  registrarUsuario,
  modificarUsuario,
  borrarUsuario,
} from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/', listarUsuarios);
router.post('/login', loginUsuario);
router.post('/', registrarUsuario);
router.get('/:id', obtenerUsuario);
router.patch('/:id', modificarUsuario);
router.delete('/:id', borrarUsuario);

export default router;
