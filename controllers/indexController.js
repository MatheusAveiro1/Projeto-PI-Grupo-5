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
      res.render('index', {produtos: produtos, carrinho: req.session.carrinho})

    }
    catch (err){
      console.log(err)
    }

  },
  produto: async (req, res)=>{

    try {
      //let nomeDoArquivo = './database/produtos.json'
      //pegando id que esta vendo da pagina index
      let id = req.params.id;
      // buscando informacoes de produto banco de dados
      let infoProduto = await Produto.findByPk (id, {
        include: ['produto_categoria', 'produto_marca']
      })
      infoProduto = infoProduto.dataValues
        //console.log (infoProduto)

    res.render('produto',{produto: infoProduto , idProduto: id, carrinho: req.session.carrinho})


    }
    catch (err){
      console.log(err)
    //let produtos = JSON.parse(fs.readFileSync(nomeDoArquivo, 'utf-8')); // conversão do json para um objeto: fs read lê o arquivo, e json.parse converte o aruivo para objeto literal
    }
  }
}

module.exports = controlador;