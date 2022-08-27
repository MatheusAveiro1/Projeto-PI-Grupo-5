const fs = require('fs');//metodo fs Manipulador de arquivos
const {sequelize, Produto} = require('../models');

const controlador = {
  index: async (req, res)=> {
    try {
      const produtos = await Produto.findAll(
        {
          limit: 24,
          include:[
              'produto_categoria',
              'produto_marca'
          ]
      })
      console.log(produtos[0].nome)
      res.render('index', {produtos: produtos})

    }
    catch (err){
      console.log(err)
    }

  },
  produto: (req, res)=>{
    let nomeDoArquivo = './database/produtos.json'
    let produtos = JSON.parse(fs.readFileSync(nomeDoArquivo, 'utf-8')); // conversão do json para um objeto: fs read lê o arquivo, e json.parse converte o aruivo para objeto literal
    let id = req.params.id;
    res.render('produto',{produtos: produtos , idProduto: id})
  }
}

module.exports = controlador;