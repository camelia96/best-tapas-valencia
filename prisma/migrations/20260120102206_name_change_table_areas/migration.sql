/*
  Warnings:

  - You are about to drop the `barrios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bars" DROP CONSTRAINT "bars_area_id_fkey";

-- DropTable
DROP TABLE "barrios";

-- CreateTable
CREATE TABLE "areas" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bars" ADD CONSTRAINT "bars_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
