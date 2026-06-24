import * as servicioCategorias from '../services/categorias.service.js';
import { respuestaExitosa } from '../utils/respuestasHttp.js';

export const listarCategorias = async (solicitud, respuesta, siguiente) => {
  try {
    const categorias = await servicioCategorias.obtenerTodasLasCategorias();
    respuestaExitosa(respuesta, categorias);
  } catch (error) {
    siguiente(error);
  }
};

export const obtenerCategoria = async (solicitud, respuesta, siguiente) => {
  try {
    const categoria = await servicioCategorias.obtenerCategoriaPorId(solicitud.params.id);
    respuestaExitosa(respuesta, categoria);
  } catch (error) {
    siguiente(error);
  }
};

export const registrarCategoria = async (solicitud, respuesta, siguiente) => {
  try {
    const categoriaCreada = await servicioCategorias.crearCategoria(solicitud.body);
    respuestaExitosa(respuesta, categoriaCreada, 201);
  } catch (error) {
    siguiente(error);
  }
};

export const modificarCategoria = async (solicitud, respuesta, siguiente) => {
  try {
    const categoriaActualizada = await servicioCategorias.actualizarCategoria(
      solicitud.params.id,
      solicitud.body,
    );
    respuestaExitosa(respuesta, categoriaActualizada);
  } catch (error) {
    siguiente(error);
  }
};

export const borrarCategoria = async (solicitud, respuesta, siguiente) => {
  try {
    await servicioCategorias.eliminarCategoria(solicitud.params.id);
    respuestaExitosa(respuesta, { mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    siguiente(error);
  }
};
