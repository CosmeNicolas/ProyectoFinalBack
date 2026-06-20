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

async function sembrarCategorias() {
  for (const nombreCategoria of categoriasIniciales) {
    await prisma.categoria.upsert({
      where: { nombre: nombreCategoria },
      update: {},
      create: { nombre: nombreCategoria },
    });
  }

  console.log('Categorías iniciales creadas correctamente.');
}

sembrarCategorias()
  .catch((error) => {
    console.error('Error al sembrar categorías:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
