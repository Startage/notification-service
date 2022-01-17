/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserConfirmedEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserConfirmedEmail" DROP CONSTRAINT "UserConfirmedEmail_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- DropTable
DROP TABLE "UserConfirmedEmail";

-- CreateTable
CREATE TABLE "EmailTemplate" (
    "id" UUID NOT NULL,
    "fileTemplateName" VARCHAR(255) NOT NULL,
    "fromEmail" VARCHAR(120) NOT NULL,
    "bccEmail" VARCHAR(255) NOT NULL,
    "subjectEmail" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEmail" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "emailTemplateId" UUID NOT NULL,
    "fromEmail" VARCHAR(120) NOT NULL,
    "bccEmail" VARCHAR(255) NOT NULL,
    "subjectEmail" VARCHAR(255) NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_fileTemplateName_key" ON "EmailTemplate"("fileTemplateName");

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmail" ADD CONSTRAINT "UserEmail_emailTemplateId_fkey" FOREIGN KEY ("emailTemplateId") REFERENCES "EmailTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
