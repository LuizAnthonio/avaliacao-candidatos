/*
  Warnings:

  - Added the required column `veiculoId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "veiculoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
