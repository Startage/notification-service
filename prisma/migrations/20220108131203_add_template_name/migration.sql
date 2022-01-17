/*
  Warnings:

  - Added the required column `templateName` to the `EmailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" ADD COLUMN     "templateName" VARCHAR(120) NOT NULL,
ALTER COLUMN "bccEmail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserEmail" ALTER COLUMN "bccEmail" DROP NOT NULL;
