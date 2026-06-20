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

export const registrarCategoria = async (solicitud, respuesta, siguiente) => {
  try {
    const categoriaCreada = await servicioCategorias.crearCategoria(solicitud.body);
    respuestaExitosa(respuesta, categoriaCreada, 201);
  } catch (error) {
    siguiente(error);
  }
};
