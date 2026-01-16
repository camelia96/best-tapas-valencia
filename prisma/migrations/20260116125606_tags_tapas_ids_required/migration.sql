/*
  Warnings:

  - Made the column `tapa_id` on table `tags_tapas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tag_id` on table `tags_tapas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tags_tapas" ALTER COLUMN "tapa_id" SET NOT NULL,
ALTER COLUMN "tag_id" SET NOT NULL;
