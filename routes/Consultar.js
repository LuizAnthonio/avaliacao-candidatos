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


router.post("/login", async (req,res) => {

  try{
    const userCollab = await prisma.colaborador.findUnique({
      where:{email: req.body.email}
    });
  
    if(!userCollab){
      return res.status(404).json({message:"Usuário não encontrado"})
    }
  
    if(!await bcrypt.compare(req.body.senha,userCollab.senha)){
  
      return res.status(404).json({message:"Senha invalida tente novamente!"})
  
      
    }
  
  
    const token = jwt.sign({id:userCollab.id,permissao:userCollab.permissao},"segredinho");
  
    res.cookie("jwt",token,{
      httpOnly:true,
      maxAge: 24 * 60 * 60 * 1000 // por um dia de cookie
    })
    
    res.json({
      message:"Sucesso"
    })

  }catch(error){

    res.json({ 
      
      err:error.message})
  }

    
})





router.get("/tickets", async (req,res) => {

    try {

      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
   

      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }




      const tickets = await prisma.ticket.findMany({
        include: {
          assignedTo: true,
          motivo: true,
          tipo:true 
        },
      });

      const resultados = Bakai.formatarObj(tickets);


      res.status(200).json(resultados);
    } catch (error) {
      res.status(500).json({ 
        message:"naoautenticado",
        err:error
      });
    }
  
    
  });


router.get("/tipos", async (req,res) => {

    try {

      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
   

      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }



      const tipos = await prisma.tipos.findMany({});
      res.status(200).json(tipos);
    } catch (error) {
      res.status(500).json({ 
        message:"naoautenticado",
        err:error
      });
    }
  
    
  });
  
  
  router.get("/motivos", async (req,res) => {
  
      try {
        
        const cookie = req.cookies['jwt']

        const requisicao = jwt.verify(cookie,"segredinho");
    
  
        if(!requisicao){
          return res.status(401).json({
            message:"naoautenticado"
          })
        }
  

        const motivos = await prisma.motivos.findMany({});

        res.status(200).json(motivos);
      } catch (error) {
        res.status(500).json({  
          message:"naoautenticado",
          err:error 
        });
      }
    
      
    });

router.get("/colaboradores", async (req,res) => {

    try {

      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");

      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }

      const colaboradores = await prisma.colaborador.findMany({});

      

      res.status(200).json(colaboradores);
    } catch (error) {
      res.status(500).json({ 
        message:"naoautenticado",
        err:error
      });
    }
  
    
  });


router.get("/colaborador", async (req,res) => {

    try {
      const cookie = req.cookies['jwt']

      const requisicao = jwt.verify(cookie,"segredinho");
      
      

      if(!requisicao){
        return res.status(401).json({
          message:"naoautenticado"
        })
      }


      const userColab = await prisma.colaborador.findUnique({
        where:{id:requisicao.id}
      })

      const {senha:senha,...dadosColab} = userColab;






      res.status(200).json(dadosColab);



    } catch (error) {
      return res.status(401).json({
        message:"naoautenticado",
        err:error
      })
    }
  
    
  });


  router.post("/logout", (req,res) => {
    res.cookie('jwt', '',{maxAge:0});
    res.status(200).json({
      message:'Deslogado Com sucesso'
    })
  })

  module.exports = router;