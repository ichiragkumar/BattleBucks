-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "discordLink" TEXT,
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "proUser" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twitterLink" TEXT;
