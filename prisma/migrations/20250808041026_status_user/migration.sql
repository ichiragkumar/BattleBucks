/*
  Warnings:

  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "status",
ADD COLUMN     "isUserActive" "public"."USER_STATUS" NOT NULL DEFAULT 'ACTIVE';
