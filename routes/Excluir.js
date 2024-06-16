const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const Bakai = require("../Bankai/forma1.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();



router.delete("/ticket/:id", async (req,res) => {

  const id = req.params.id;

  const cookie = req.cookies['jwt']

  const requisicao = jwt.verify(cookie,"segredinho");


  if(!requisicao){
    return res.status(401).json({
      message:"naoautenticado"
    })
  }
  
  if(requisicao.permissao > 0){
    return res.status(401).json({
      message:"Permissão negada somente Admin's podem realizar esta ação.",
      err:"AdminNecessario"
    
    })
  }



    try {
      const tickets = await prisma.ticket.delete({
        where:{id:parseInt(id)}
      });
      
      res.status(200).json({menssage:"Excluido",tik:tickets});

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  

router.delete("/colaborador/:id", async (req,res) => {

  const idUser = req.params.id

  const cookie = req.cookies['jwt']

  const requisicao = jwt.verify(cookie,"segredinho");


  if(!requisicao){
    return res.status(401).json({
      message:"naoautenticado"
    })
  }
  
  if(requisicao.permissao > 0){
    return res.status(401).json({
      message:"Permissão negada somente Admin's podem realizar esta ação.",
      err:"AdminNecessario"
    
    })
  }



    try {
      const collaborator = await prisma.colaborador.delete({
        where:{id:parseInt(idUser)}
      });

      res.status(200).json({menssage:`Conta do colaborador ${collaborator.name} Excluido` ,dados:collaborator});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;