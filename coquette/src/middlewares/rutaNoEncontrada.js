export const rutaNoEncontrada = (solicitud, respuesta) => {
  respuesta.status(404).json({
    exito: false,
    mensaje: `Ruta no encontrada: ${solicitud.method} ${solicitud.originalUrl}`,
  });
};
