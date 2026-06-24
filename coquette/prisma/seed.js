import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoriasIniciales = [
  'Remeras',
  'Pantalones',
  'Camperas',
  'Vestidos',
  'Calzado',
  'Accesorios',
];

async function sembrarDatosIniciales() {
  for (const nombreCategoria of categoriasIniciales) {
    await prisma.categoria.upsert({
      where: { nombre: nombreCategoria },
      update: {},
      create: { nombre: nombreCategoria },
    });
  }

  await prisma.usuario.upsert({
    where: { nombreUsuario: 'coquette' },
    update: {
      contrasena: 'vintage2026',
    },
    create: {
      nombre: 'Coquette',
      nombreUsuario: 'coquette',
      contrasena: 'vintage2026',
      email: 'coquette@vintage.com',
    },
  });

  console.log('Datos iniciales creados correctamente.');
}

sembrarDatosIniciales()
  .catch((error) => {
    console.error('Error al sembrar datos iniciales:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
