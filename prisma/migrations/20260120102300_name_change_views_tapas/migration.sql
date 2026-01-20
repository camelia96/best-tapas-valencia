/*
  Warnings:

  - You are about to drop the column `seen` on the `tapas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tapas" DROP COLUMN "seen",
ADD COLUMN     "views" INTEGER DEFAULT 0;
