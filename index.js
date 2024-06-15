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


app.post("/", async (req,res) => {



  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        assignedTo: true, 
      },
    });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


})


const PORT = 8000;

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})