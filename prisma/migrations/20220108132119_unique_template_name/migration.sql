/*
  Warnings:

  - A unique constraint covering the columns `[templateName]` on the table `EmailTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EmailTemplate_fileTemplateName_key";

-- CreateIndex
CREATE UNIQUE INDEX "EmailTemplate_templateName_key" ON "EmailTemplate"("templateName");
