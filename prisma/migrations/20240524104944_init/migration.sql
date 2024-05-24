/*
  Warnings:

  - You are about to drop the column `VideoLink` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `videoScheduled` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "VideoLink",
DROP COLUMN "address",
DROP COLUMN "videoScheduled",
ADD COLUMN     "createdByLLS" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "endDateTime" TIMESTAMP(3),
ADD COLUMN     "requestorEmail" TEXT,
ADD COLUMN     "requestorName" TEXT,
ADD COLUMN     "videoLink" TEXT,
ADD COLUMN     "videoLinkField" TEXT,
ADD COLUMN     "vriLabel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vriRoomNumber" INTEGER,
ADD COLUMN     "vriType" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "zoomInvitation" TEXT,
ADD COLUMN     "zoomJoinLink" TEXT,
ADD COLUMN     "zoomMeetingId" TEXT,
ADD COLUMN     "zoomStartLink" TEXT,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "durationHrs" DROP NOT NULL,
ALTER COLUMN "durationMins" DROP NOT NULL,
ALTER COLUMN "timeZone" DROP NOT NULL,
ALTER COLUMN "vriApproved" SET DEFAULT false,
ALTER COLUMN "status" DROP NOT NULL;
