/*
  Warnings:

  - You are about to drop the column `barrio_id` on the `bares` table. All the data in the column will be lost.
  - You are about to drop the column `coordinadas_latitud` on the `bares` table. All the data in the column will be lost.
  - You are about to drop the column `coordinadas_longitud` on the `bares` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `bares` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `bares` table. All the data in the column will be lost.
  - Added the required column `area_id` to the `bares` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `bares` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bares" DROP CONSTRAINT "bares_barrio_id_fkey";

-- AlterTable
ALTER TABLE "bares" DROP COLUMN "barrio_id",
DROP COLUMN "coordinadas_latitud",
DROP COLUMN "coordinadas_longitud",
DROP COLUMN "direccion",
DROP COLUMN "nombre",
ADD COLUMN     "area_id" SMALLINT NOT NULL,
ADD COLUMN     "direction" VARCHAR,
ADD COLUMN     "latitude_coord" DOUBLE PRECISION,
ADD COLUMN     "longitude_coord" DOUBLE PRECISION,
ADD COLUMN     "name" VARCHAR NOT NULL;

-- AddForeignKey
ALTER TABLE "bares" ADD CONSTRAINT "bares_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "barrios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
