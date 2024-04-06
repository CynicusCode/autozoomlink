/*
  Warnings:

  - Changed the type of `jobNumber` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "jobNumber",
ADD COLUMN     "jobNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_jobNumber_key" ON "Appointment"("jobNumber");
