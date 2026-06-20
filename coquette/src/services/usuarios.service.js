import prisma from '../db/prismaCliente.js';
import { ErrorAplicacion } from '../utils/respuestasHttp.js';

export const obtenerTodosLosUsuarios = async () => {
  return prisma.usuario.findMany({
    orderBy: { creadoEn: 'desc' },
  });
};

export const obtenerUsuarioPorId = async (idUsuario) => {
  const usuarioEncontrado = await prisma.usuario.findUnique({
    where: { id: Number(idUsuario) },
    include: { productos: true },
  });

  if (!usuarioEncontrado) {
    throw new ErrorAplicacion('Usuario no encontrado', 404);
  }

  return usuarioEncontrado;
};

export const crearUsuario = async (datosUsuario) => {
  const { nombre, email, telefono } = datosUsuario;

  if (!nombre || !email) {
    throw new ErrorAplicacion('Nombre y email son obligatorios', 400);
  }

  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    throw new ErrorAplicacion('Ya existe un usuario con ese email', 409);
  }

  return prisma.usuario.create({
    data: { nombre, email, telefono },
  });
};

export const actualizarUsuario = async (idUsuario, datosActualizados) => {
  await obtenerUsuarioPorId(idUsuario);

  const { nombre, email, telefono } = datosActualizados;

  if (email) {
    const emailEnUso = await prisma.usuario.findFirst({
      where: {
        email,
        NOT: { id: Number(idUsuario) },
      },
    });

    if (emailEnUso) {
      throw new ErrorAplicacion('Ya existe un usuario con ese email', 409);
    }
  }

  return prisma.usuario.update({
    where: { id: Number(idUsuario) },
    data: { nombre, email, telefono },
  });
};

export const eliminarUsuario = async (idUsuario) => {
  await obtenerUsuarioPorId(idUsuario);

  return prisma.usuario.delete({
    where: { id: Number(idUsuario) },
  });
};
