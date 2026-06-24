import prisma from '../db/prismaCliente.js';
import { ErrorAplicacion } from '../utils/respuestasHttp.js';

const camposPublicosUsuario = {
  id: true,
  nombre: true,
  nombreUsuario: true,
  email: true,
  telefono: true,
  creadoEn: true,
  actualizadoEn: true,
};


// Obtener todos los usuarios
export const obtenerTodosLosUsuarios = async () => {
  return prisma.usuario.findMany({
    select: camposPublicosUsuario,
    orderBy: { creadoEn: 'desc' },
  });
};
// Obtener un usuario por su id
export const obtenerUsuarioPorId = async (idUsuario) => {
  const usuarioEncontrado = await prisma.usuario.findUnique({
    where: { id: Number(idUsuario) },
    select: {
      ...camposPublicosUsuario,
      productos: true,
    },
  });

  if (!usuarioEncontrado) {
    throw new ErrorAplicacion('Usuario no encontrado', 404);
  }

  return usuarioEncontrado;
};

// Iniciar sesión
export const iniciarSesion = async (nombreUsuario, contrasena) => {
  if (!nombreUsuario || !contrasena) {
    throw new ErrorAplicacion('Usuario y contraseña son obligatorios', 400);
  }

  const usuarioEncontrado = await prisma.usuario.findUnique({
    where: { nombreUsuario },
  });

  if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
    throw new ErrorAplicacion('Usuario o contraseña incorrectos', 401);
  }

  const { contrasena: _, ...usuarioPublico } = usuarioEncontrado;
  return usuarioPublico;
};

// Crear un nuevo usuario
export const crearUsuario = async (datosUsuario) => {
  const { nombre, nombreUsuario, contrasena, email, telefono } = datosUsuario;

  if (!nombre || !nombreUsuario || !contrasena || !email) {
    throw new ErrorAplicacion(
      'Nombre, nombre de usuario, contraseña y email son obligatorios',
      400,
    );
  }

  // Verificar si el email o nombre de usuario ya existe
  const usuarioExistente = await prisma.usuario.findFirst({
    where: {
      OR: [{ email }, { nombreUsuario }],
    },
  });

  if (usuarioExistente) {
    throw new ErrorAplicacion('Ya existe un usuario con ese email o nombre de usuario', 409);
  }

  const usuarioCreado = await prisma.usuario.create({
    data: { nombre, nombreUsuario, contrasena, email, telefono },
  });

  const { contrasena: _, ...usuarioPublico } = usuarioCreado;
  return usuarioPublico;
};

// Actualizar un usuario
export const actualizarUsuario = async (idUsuario, datosActualizados) => {
  await obtenerUsuarioPorId(idUsuario);

  const { nombre, nombreUsuario, contrasena, email, telefono } = datosActualizados;

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

  if (nombreUsuario) {
    const nombreUsuarioEnUso = await prisma.usuario.findFirst({
      where: {
        nombreUsuario,
        NOT: { id: Number(idUsuario) },
      },
    });

    if (nombreUsuarioEnUso) {
      throw new ErrorAplicacion('Ya existe un usuario con ese nombre de usuario', 409);
    }
  }

  const usuarioActualizado = await prisma.usuario.update({
    where: { id: Number(idUsuario) },
    data: { nombre, nombreUsuario, contrasena, email, telefono },
  });

  const { contrasena: _, ...usuarioPublico } = usuarioActualizado;
  return usuarioPublico;
};

export const eliminarUsuario = async (idUsuario) => {
  await obtenerUsuarioPorId(idUsuario);

  return prisma.usuario.delete({
    where: { id: Number(idUsuario) },
  });
};
