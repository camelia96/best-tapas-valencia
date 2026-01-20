/*
  Warnings:

  - You are about to drop the column `categoria_id` on the `tapas` table. All the data in the column will be lost.
  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `tapas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tapas" DROP CONSTRAINT "tapas_categoria_id_fkey";

-- AlterTable
ALTER TABLE "tapas" DROP COLUMN "categoria_id",
ADD COLUMN     "category_id" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "categorias";

-- CreateTable
CREATE TABLE "categories" (
    "id" SMALLSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tapas" ADD CONSTRAINT "tapas_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
