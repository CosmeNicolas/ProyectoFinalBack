import prisma from '../db/prismaCliente.js';
import { ErrorAplicacion } from '../utils/respuestasHttp.js';

const categoriasPermitidas = [
  'Remeras',
  'Pantalones',
  'Camperas',
  'Vestidos',
  'Calzado',
  'Accesorios',
];

export const obtenerTodasLasCategorias = async () => {
  return prisma.categoria.findMany({
    orderBy: { nombre: 'asc' },
  });
};

export const crearCategoria = async (datosCategoria) => {
  const { nombre } = datosCategoria;

  if (!nombre) {
    throw new ErrorAplicacion('El nombre de la categoría es obligatorio', 400);
  }

  if (!categoriasPermitidas.includes(nombre)) {
    throw new ErrorAplicacion(
      `Categoría no permitida. Valores válidos: ${categoriasPermitidas.join(', ')}`,
      400,
    );
  }

  const categoriaExistente = await prisma.categoria.findUnique({
    where: { nombre },
  });

  if (categoriaExistente) {
    throw new ErrorAplicacion('La categoría ya existe', 409);
  }

  return prisma.categoria.create({
    data: { nombre },
  });
};
