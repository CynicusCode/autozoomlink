-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "durationHrs" INTEGER NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "vriApproved" BOOLEAN NOT NULL,
    "videoScheduled" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "VideoLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_jobNumber_key" ON "Appointment"("jobNumber");
