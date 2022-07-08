/*
  Warnings:

  - You are about to drop the column `activationLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActivated` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "activationLink",
DROP COLUMN "isActivated";

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
