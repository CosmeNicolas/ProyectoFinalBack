-- AlterTable: agregar campos de login con valores temporales para usuarios existentes
ALTER TABLE "usuarios" ADD COLUMN "nombre_usuario" TEXT;
ALTER TABLE "usuarios" ADD COLUMN "contrasena" TEXT;

UPDATE "usuarios"
SET
  "nombre_usuario" = CONCAT('user_', "id"),
  "contrasena" = 'cambiar123'
WHERE "nombre_usuario" IS NULL;

ALTER TABLE "usuarios" ALTER COLUMN "nombre_usuario" SET NOT NULL;
ALTER TABLE "usuarios" ALTER COLUMN "contrasena" SET NOT NULL;

CREATE UNIQUE INDEX "usuarios_nombre_usuario_key" ON "usuarios"("nombre_usuario");
