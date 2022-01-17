/*
  Warnings:

  - Added the required column `toEmail` to the `UserEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEmail" ADD COLUMN     "toEmail" VARCHAR(255) NOT NULL;
