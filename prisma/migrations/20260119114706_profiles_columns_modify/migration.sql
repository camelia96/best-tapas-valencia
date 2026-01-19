/*
  Warnings:

  - You are about to drop the column `email` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `password` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "email",
ADD COLUMN     "password" VARCHAR(256) NOT NULL,
ADD COLUMN     "username" VARCHAR(256) NOT NULL;
