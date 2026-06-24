import prisma from '../db/prismaCliente.js';
import { ErrorAplicacion } from '../utils/respuestasHttp.js';

export const obtenerTodasLasCategorias = async () => {
  return prisma.categoria.findMany({
    orderBy: { nombre: 'asc' },
  });
};

export const obtenerCategoriaPorId = async (idCategoria) => {
  const categoriaEncontrada = await prisma.categoria.findUnique({
    where: { id: Number(idCategoria) },
  });

  if (!categoriaEncontrada) {
    throw new ErrorAplicacion('Categoría no encontrada', 404);
  }

  return categoriaEncontrada;
};

export const crearCategoria = async (datosCategoria) => {
  const { nombre } = datosCategoria;

  if (!nombre?.trim()) {
    throw new ErrorAplicacion('El nombre de la categoría es obligatorio', 400);
  }

  const categoriaExistente = await prisma.categoria.findUnique({
    where: { nombre: nombre.trim() },
  });

  if (categoriaExistente) {
    throw new ErrorAplicacion('La categoría ya existe', 409);
  }

  return prisma.categoria.create({
    data: { nombre: nombre.trim() },
  });
};

export const actualizarCategoria = async (idCategoria, datosActualizados) => {
  await obtenerCategoriaPorId(idCategoria);

  const { nombre } = datosActualizados;

  if (!nombre?.trim()) {
    throw new ErrorAplicacion('El nombre de la categoría es obligatorio', 400);
  }

  const nombreEnUso = await prisma.categoria.findFirst({
    where: {
      nombre: nombre.trim(),
      NOT: { id: Number(idCategoria) },
    },
  });

  if (nombreEnUso) {
    throw new ErrorAplicacion('Ya existe otra categoría con ese nombre', 409);
  }

  return prisma.categoria.update({
    where: { id: Number(idCategoria) },
    data: { nombre: nombre.trim() },
  });
};

export const eliminarCategoria = async (idCategoria) => {
  await obtenerCategoriaPorId(idCategoria);

  const productosAsociados = await prisma.producto.count({
    where: { categoriaId: Number(idCategoria) },
  });

  if (productosAsociados > 0) {
    throw new ErrorAplicacion(
      'No se puede eliminar: hay productos asociados a esta categoría',
      409,
    );
  }

  return prisma.categoria.delete({
    where: { id: Number(idCategoria) },
  });
};
