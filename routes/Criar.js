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

      const {assignedToId,title,description,motivoId,tipoId,dataAbertura,veiculoId,clienteId,prazo,status} = req.body

      console.log(assignedToId,title,description,motivoId,tipoId,dataAbertura,veiculoId,clienteId,prazo,status)

      const tickets = await prisma.ticket.create({
        data:{
          title,
          description,
          assignedToId,
          clienteId,
          motivoId,
          tipoId,
          veiculoId,
          dataAbertura:(new Date(dataAbertura)),
          prazo:(new Date(prazo)),
          status
        }
      });
      
      res.status(200).json(tickets);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

router.post("/motivo", async (req,res) => {

    try {

      const {name,descricaoMotivo} = req.body

      console.log(name,descricaoMotivo)

      const motivo = await prisma.motivos.create({
        data:{
          name,
          descricaoMotivo
        }
      });
      
      res.status(200).json(motivo);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

router.post("/cliente", async (req,res) => {

    try {

      const {name,email,telefone} = req.body

      console.log(name,email,telefone)

      const cliente = await prisma.clientes.create({
        data:{
          name,
          email,
          telefone
        }
      });
      
      res.status(200).json(cliente);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

router.post("/veiculo", async (req,res) => {

    try {

      const {veiculo,descricao} = req.body

      console.log(veiculo,descricao)

      const oVeiculo = await prisma.veiculos.create({
        data:{
          veiculo,
          descricao
        }
      });
      
      res.status(200).json(oVeiculo);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  
router.post("/tipo", async (req,res) => {

    try {

      const {name,descricaoTipo} = req.body

      console.log(name,descricaoTipo)

      const tipo = await prisma.tipos.create({
        data:{
          name,
          descricaoTipo
        }
      });
      
      res.status(200).json(tipo);

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

      //validação feita cria a senha mas não mostra, porem mostra o resto dos dados
      const {senha,...dados} = colaborador
      
      console.log(dados)

      res.status(200).json(dados);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
    
  });

  module.exports = router;