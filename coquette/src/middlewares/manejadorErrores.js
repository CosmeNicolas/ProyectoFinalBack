export const manejadorErrores = (error, solicitud, respuesta, siguiente) => {
  console.error(error);

  const codigoEstado = error.codigoEstado || 500;
  const mensaje = error.message || 'Error interno del servidor';

  respuesta.status(codigoEstado).json({
    exito: false,
    mensaje,
  });
};
