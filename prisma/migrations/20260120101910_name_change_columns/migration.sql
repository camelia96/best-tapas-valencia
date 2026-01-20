/*
  Warnings:

  - You are about to drop the column `nombre` on the `barrios` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the column `imagen_url` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the column `precio` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the column `puntuacion` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the column `vistos` on the `tapas` table. All the data in the column will be lost.
  - Added the required column `name` to the `barrios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tapas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `tapas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "barrios" DROP COLUMN "nombre",
ADD COLUMN     "name" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "nombre",
ADD COLUMN     "name" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "nombre",
ADD COLUMN     "name" VARCHAR;

-- AlterTable
ALTER TABLE "tapas" DROP COLUMN "descripcion",
DROP COLUMN "imagen_url",
DROP COLUMN "nombre",
DROP COLUMN "precio",
DROP COLUMN "puntuacion",
DROP COLUMN "vistos",
ADD COLUMN     "description" VARCHAR,
ADD COLUMN     "image_url" VARCHAR,
ADD COLUMN     "name" VARCHAR NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" INTEGER DEFAULT 0,
ADD COLUMN     "seen" INTEGER DEFAULT 0;
