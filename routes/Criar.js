const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router()

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



router.post("/ticket", async (req,res) => {

    try {
      const tickets = await prisma.ticket.create({});
      
      res.status(200).json(tickets);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  

router.post("/colaborador", async (req,res) => {

    const {nome,email,ticket,permissao} = req.body

    console.log(nome,email,ticket,permissao)
    try {
      const colaborador = await prisma.colaborador.create({
        name:nome,
        email:email,
        tickets:ticket,
        permissao:permissao
      });

      res.status(200).json(colaborador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;