/*
  Warnings:

  - Added the required column `dataAbertura` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivoId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "dataAbertura" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "motivoId" INTEGER NOT NULL,
ADD COLUMN     "prazo" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL,
ADD COLUMN     "tipoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Motivos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricaoMotivo" TEXT NOT NULL,

    CONSTRAINT "Motivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricaoTipo" TEXT NOT NULL,

    CONSTRAINT "Tipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Veiculos" (
    "id" SERIAL NOT NULL,
    "veiculo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Veiculos_pkey" PRIMARY KEY ("id")
);
