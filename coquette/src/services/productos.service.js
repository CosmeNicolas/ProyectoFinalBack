import prisma from '../db/prismaCliente.js';
import { ErrorAplicacion } from '../utils/respuestasHttp.js';

const estadosPrendaValidos = ['NUEVO', 'COMO_NUEVO', 'BUENO', 'REGULAR'];

const validarDatosProducto = (datosProducto, esCreacion = true) => {
  const camposObligatorios = [
    'nombre',
    'descripcion',
    'precio',
    'talle',
    'marca',
    'estadoPrenda',
    'imagenUrl',
    'usuarioId',
    'categoriaId',
  ];

  if (esCreacion) {
    for (const campo of camposObligatorios) {
      if (datosProducto[campo] === undefined || datosProducto[campo] === null || datosProducto[campo] === '') {
        throw new ErrorAplicacion(`El campo "${campo}" es obligatorio`, 400);
      }
    }
  }

  if (datosProducto.estadoPrenda && !estadosPrendaValidos.includes(datosProducto.estadoPrenda)) {
    throw new ErrorAplicacion(
      `Estado de prenda inválido. Valores permitidos: ${estadosPrendaValidos.join(', ')}`,
      400,
    );
  }

  if (datosProducto.precio !== undefined && Number(datosProducto.precio) <= 0) {
    throw new ErrorAplicacion('El precio debe ser mayor a cero', 400);
  }
};

export const obtenerTodosLosProductos = async () => {
  return prisma.producto.findMany({
    include: {
      usuario: { select: { id: true, nombre: true, email: true } },
      categoria: true,
    },
    orderBy: { creadoEn: 'desc' },
  });
};

export const obtenerProductoPorId = async (idProducto) => {
  const productoEncontrado = await prisma.producto.findUnique({
    where: { id: Number(idProducto) },
    include: {
      usuario: { select: { id: true, nombre: true, email: true } },
      categoria: true,
    },
  });

  if (!productoEncontrado) {
    throw new ErrorAplicacion('Producto no encontrado', 404);
  }

  return productoEncontrado;
};

export const crearProducto = async (datosProducto) => {
  validarDatosProducto(datosProducto);

  const usuarioExiste = await prisma.usuario.findUnique({
    where: { id: Number(datosProducto.usuarioId) },
  });

  if (!usuarioExiste) {
    throw new ErrorAplicacion('El usuario indicado no existe', 404);
  }

  const categoriaExiste = await prisma.categoria.findUnique({
    where: { id: Number(datosProducto.categoriaId) },
  });

  if (!categoriaExiste) {
    throw new ErrorAplicacion('La categoría indicada no existe', 404);
  }

  return prisma.producto.create({
    data: {
      nombre: datosProducto.nombre,
      descripcion: datosProducto.descripcion,
      precio: datosProducto.precio,
      talle: datosProducto.talle,
      marca: datosProducto.marca,
      estadoPrenda: datosProducto.estadoPrenda,
      imagenUrl: datosProducto.imagenUrl,
      disponible: datosProducto.disponible ?? true,
      usuarioId: Number(datosProducto.usuarioId),
      categoriaId: Number(datosProducto.categoriaId),
    },
    include: { categoria: true },
  });
};

export const actualizarProducto = async (idProducto, datosActualizados) => {
  await obtenerProductoPorId(idProducto);
  validarDatosProducto(datosActualizados, false);

  if (datosActualizados.usuarioId) {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: Number(datosActualizados.usuarioId) },
    });

    if (!usuarioExiste) {
      throw new ErrorAplicacion('El usuario indicado no existe', 404);
    }
  }

  if (datosActualizados.categoriaId) {
    const categoriaExiste = await prisma.categoria.findUnique({
      where: { id: Number(datosActualizados.categoriaId) },
    });

    if (!categoriaExiste) {
      throw new ErrorAplicacion('La categoría indicada no existe', 404);
    }
  }

  const datosParaActualizar = { ...datosActualizados };

  if (datosParaActualizar.usuarioId) {
    datosParaActualizar.usuarioId = Number(datosParaActualizar.usuarioId);
  }

  if (datosParaActualizar.categoriaId) {
    datosParaActualizar.categoriaId = Number(datosParaActualizar.categoriaId);
  }

  return prisma.producto.update({
    where: { id: Number(idProducto) },
    data: datosParaActualizar,
    include: { categoria: true },
  });
};

export const eliminarProducto = async (idProducto) => {
  await obtenerProductoPorId(idProducto);

  return prisma.producto.delete({
    where: { id: Number(idProducto) },
  });
};
