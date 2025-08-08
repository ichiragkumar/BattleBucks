/*
  Warnings:

  - You are about to drop the column `isUserActive` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."USER_STATUS" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED', 'BANNED');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "isUserActive",
ADD COLUMN     "status" "public"."USER_STATUS" NOT NULL DEFAULT 'ACTIVE';
