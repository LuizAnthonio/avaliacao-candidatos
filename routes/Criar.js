const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const bcryptjs = require("bcryptjs");

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

    const salt = await bcryptjs.genSalt(10);
    
    const {name,email,senha,permissao} = req.body
    
    const senhaHash = await bcryptjs.hash(senha,salt)


    console.log(name,email,{senha:senha,senhaHash:senhaHash},permissao)
    try {
      const colaborador = await prisma.colaborador.create({
        data:{name,email,senha:senhaHash,permissao},
      });

      res.status(200).json(colaborador);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;