const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router()

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



router.put("/ticket/:id", async (req,res) => {

    try {

      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
    
    
      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }
      
   

      const idTicket = parseInt(req.params.id);

      const {title,description,assignedToId} = req.body

      const tickets = await prisma.ticket.update({
        where: {id: idTicket},
        data: {title,description,assignedToId}
      });
      
      res.status(200).json(tickets);

    } catch (error) {
      res.status(401).json({
        message:"naoautenticado"
      });
    }
  
    
  });

router.get("/ticket/:id", async (req,res) => {

    try {
      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
    
    
      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }
    

      const idTicket = parseInt(req.params.id);

     

      const tickets = await prisma.ticket.findUnique({
        where: {id: idTicket}
      });
      
      res.status(200).json(tickets);

    } catch (error) {
       res.status(401).json({
        message:"naoautenticado"
      })
    }
  
    
  });

  

router.post("/colaborador", async (req,res) => {

    try {
      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
    
    
      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }
      
     
    
      const collaborator = await prisma.colaborador.create({});

      res.status(200).json(collaborator);
    } catch (error) {
      res.status(401).json({
        message:"naoautenticado"
      })
    }
  
    
  });

  module.exports = router;