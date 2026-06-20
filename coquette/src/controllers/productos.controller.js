import * as servicioProductos from '../services/productos.service.js';
import { respuestaExitosa } from '../utils/respuestasHttp.js';

export const listarProductos = async (solicitud, respuesta, siguiente) => {
  try {
    const productos = await servicioProductos.obtenerTodosLosProductos();
    respuestaExitosa(respuesta, productos);
  } catch (error) {
    siguiente(error);
  }
};

export const obtenerProducto = async (solicitud, respuesta, siguiente) => {
  try {
    const producto = await servicioProductos.obtenerProductoPorId(solicitud.params.id);
    respuestaExitosa(respuesta, producto);
  } catch (error) {
    siguiente(error);
  }
};

export const publicarProducto = async (solicitud, respuesta, siguiente) => {
  try {
    const productoCreado = await servicioProductos.crearProducto(solicitud.body);
    respuestaExitosa(respuesta, productoCreado, 201);
  } catch (error) {
    siguiente(error);
  }
};

export const modificarProducto = async (solicitud, respuesta, siguiente) => {
  try {
    const productoActualizado = await servicioProductos.actualizarProducto(
      solicitud.params.id,
      solicitud.body,
    );
    respuestaExitosa(respuesta, productoActualizado);
  } catch (error) {
    siguiente(error);
  }
};

export const borrarProducto = async (solicitud, respuesta, siguiente) => {
  try {
    await servicioProductos.eliminarProducto(solicitud.params.id);
    respuestaExitosa(respuesta, { mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    siguiente(error);
  }
};
