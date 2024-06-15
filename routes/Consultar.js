const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router()

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



router.get("/tickets", async (req,res) => {

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
  
    
  });



router.get("/clientes", async (req,res) => {

    try {
      const collaborator = await prisma.colaborador.findMany({});

      res.status(200).json(collaborator);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;