-- AlterTable
CREATE SEQUENCE clientes_id_seq;
ALTER TABLE "Clientes" ALTER COLUMN "id" SET DEFAULT nextval('clientes_id_seq');
ALTER SEQUENCE clientes_id_seq OWNED BY "Clientes"."id";
