/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "manualTitle" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "time" TIMESTAMP(3),
    "durationHrs" INTEGER,
    "durationMins" INTEGER,
    "endDateTime" TIMESTAMP(3),
    "timeZone" TEXT,
    "vriApproved" BOOLEAN DEFAULT false,
    "vriLabel" BOOLEAN DEFAULT false,
    "vriType" BOOLEAN DEFAULT false,
    "status" TEXT,
    "videoLink" TEXT,
    "videoLinkField" TEXT,
    "requestorName" TEXT,
    "requestorEmail" TEXT,
    "createdByLLS" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "zoomMeetingId" TEXT,
    "zoomStartLink" TEXT,
    "zoomJoinLink" TEXT,
    "zoomInvitation" TEXT,
    "vriRoomNumber" INTEGER,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_jobNumber_key" ON "Appointment"("jobNumber");
