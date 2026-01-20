/*
  Warnings:

  - You are about to drop the `bares` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bares" DROP CONSTRAINT "bares_area_id_fkey";

-- DropForeignKey
ALTER TABLE "tapas" DROP CONSTRAINT "tapas_bar_id_fkey";

-- DropTable
DROP TABLE "bares";

-- CreateTable
CREATE TABLE "bars" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "direction" VARCHAR,
    "web_url" VARCHAR,
    "latitude_coord" DOUBLE PRECISION,
    "longitude_coord" DOUBLE PRECISION,
    "area_id" SMALLINT NOT NULL,

    CONSTRAINT "bar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bars" ADD CONSTRAINT "bars_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "barrios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tapas" ADD CONSTRAINT "tapas_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "bars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
