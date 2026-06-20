export class ErrorAplicacion extends Error {
  constructor(mensaje, codigoEstado = 500) {
    super(mensaje);
    this.codigoEstado = codigoEstado;
    this.nombre = 'ErrorAplicacion';
  }
}

export const respuestaExitosa = (respuesta, datos, codigoEstado = 200) => {
  respuesta.status(codigoEstado).json({
    exito: true,
    datos,
  });
};

export const respuestaError = (respuesta, mensaje, codigoEstado = 500) => {
  respuesta.status(codigoEstado).json({
    exito: false,
    mensaje,
  });
};
