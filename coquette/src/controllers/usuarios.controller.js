import * as servicioUsuarios from '../services/usuarios.service.js';
import { respuestaExitosa } from '../utils/respuestasHttp.js';

export const listarUsuarios = async (solicitud, respuesta, siguiente) => {
  try {
    const usuarios = await servicioUsuarios.obtenerTodosLosUsuarios();
    respuestaExitosa(respuesta, usuarios);
  } catch (error) {
    siguiente(error);
  }
};

export const obtenerUsuario = async (solicitud, respuesta, siguiente) => {
  try {
    const usuario = await servicioUsuarios.obtenerUsuarioPorId(solicitud.params.id);
    respuestaExitosa(respuesta, usuario);
  } catch (error) {
    siguiente(error);
  }
};

export const registrarUsuario = async (solicitud, respuesta, siguiente) => {
  try {
    const usuarioCreado = await servicioUsuarios.crearUsuario(solicitud.body);
    respuestaExitosa(respuesta, usuarioCreado, 201);
  } catch (error) {
    siguiente(error);
  }
};

export const modificarUsuario = async (solicitud, respuesta, siguiente) => {
  try {
    const usuarioActualizado = await servicioUsuarios.actualizarUsuario(
      solicitud.params.id,
      solicitud.body,
    );
    respuestaExitosa(respuesta, usuarioActualizado);
  } catch (error) {
    siguiente(error);
  }
};

export const borrarUsuario = async (solicitud, respuesta, siguiente) => {
  try {
    await servicioUsuarios.eliminarUsuario(solicitud.params.id);
    respuestaExitosa(respuesta, { mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    siguiente(error);
  }
};
