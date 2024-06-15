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

  

router.post("/cliente", async (req,res) => {

    try {
      const collaborator = await prisma.colaborador.create({});

      res.status(200).json(collaborator);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;