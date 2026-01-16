/*
  Warnings:

  - The primary key for the `tags_tapas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tags_tapas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tags_tapas" DROP CONSTRAINT "tags_tapas_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "tags_tapas_pkey" PRIMARY KEY ("tapa_id", "tag_id");
