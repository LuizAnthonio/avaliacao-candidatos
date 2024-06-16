/*
  Warnings:

  - Added the required column `clienteId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "clienteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Clientes" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_telefone_key" ON "Clientes"("telefone");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
