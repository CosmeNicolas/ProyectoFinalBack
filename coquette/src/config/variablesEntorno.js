import dotenv from 'dotenv';

dotenv.config();

export const configuracion = {
  puerto: Number(process.env.PUERTO) || 3000,
  entorno: process.env.NODE_ENV || 'development',
  urlBaseDatos: process.env.DATABASE_URL,
};
