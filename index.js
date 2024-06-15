const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


app.use(bodyParser.json());

const consultar = require("./routes/Consultar.js");
const criar = require("./routes/Criar.js");
const editar = require("./routes/Editar.js");
const excluir = require("./routes/Excluir.js");

app.use("/",consultar);
app.use("/criar",criar);
app.use("/editar",editar);
app.use("/excluir",excluir);




const PORT = 8000;

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})