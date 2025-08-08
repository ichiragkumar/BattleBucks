/*
  Warnings:

  - You are about to drop the column `isUserActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isUserActive",
ADD COLUMN     "status" "public"."USER_STATUS" NOT NULL DEFAULT 'ACTIVE';
