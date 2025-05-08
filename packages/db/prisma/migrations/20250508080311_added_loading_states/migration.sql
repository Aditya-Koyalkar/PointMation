-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "codeLoading" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "videoLoading" BOOLEAN NOT NULL DEFAULT false;
