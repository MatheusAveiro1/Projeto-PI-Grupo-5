//const { track } = require('cordova/src/telemetry');
//const fs = require('fs');//metodo fs Manipulador de arquivos
const {sequelize, Produto, Categoria} = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
      });
      
      
      console.log('>>>>>>> Carrinho atual >>>>>>>>');
            console.log(req.session.carrinho);
      
      res.render('index', {produtos: produtos, carrinho: req.session.carrinho})

    }
    catch (err){
      console.log(err)
    }

  },
  produtosPorCategoria: async (req, res)=> {
    try{
      //Recuperando o id da categoria
      const categoria = req.params.id;
      //Buscando os produtos pela categoria no BD
      const produtos = await Produto.findAll(
        {
          limit:24,
          include:[
            'produto_categoria', 'produto_marca'
          ],
          where: {id_categoria: categoria}
        }
      )
      //Buscando as categorias no BD 
      const categorias = await Categoria.findAll();
      
      
      res.render('index', {produtos: produtos, categorias:categorias, carrinho: req.session.carrinho});

    }
    catch(err){
      console.log(err);
    }
  },
  produtosPorBarraPesquisa: async (req, res)=> {
    try{
      //Recuperando a informação da pesquisa
      const pesquisa = req.query.produtoPesquisado;
      //Buscando os produtos pelo conteudo da pesquisa
      const produtos = await Produto.findAll(
        {
          // limit:24,
          include:[
            'produto_categoria', 'produto_marca'
          ],
          where: {            
              [Op.or]: [
                {
                  nome: {
                    [Op.like]: '%'+pesquisa+'%'
                  }
                },
                {
                  descricao: {
                    [Op.like]: '%'+pesquisa+'%'
                  }
                }
              ]
          }          
        }
      );
      
      // //Buscando as categorias no BD 
      const categorias = await Categoria.findAll();      
      
      res.render('index', {produtos: produtos, categorias:categorias, carrinho: req.session.carrinho});

    }
    catch(err){
      console.log(err);
    }
  },
  produto: async (req, res)=>{

    try {
      
      //pegando id que esta vendo da pagina index
      let id = req.params.id;
      // buscando informacoes de produto banco de dados
      let infoProduto = await Produto.findByPk (id, {
      
        include: ['produto_categoria', 'produto_marca']
      })
      infoProduto = infoProduto.dataValues
        

        //pegando o id da categoria do produto
        let categoriaProduto = infoProduto.produto_categoria.id
        //procurando produtos da mesma cartegoria
        let maisProduto = await Produto.findAll ( 
          
          {
          limit: 4,
          where: {id_categoria: categoriaProduto}  
          
        }

        )
        



    res.render('produto',{produto: infoProduto , idProduto: id, produtosRelacionados: maisProduto, carrinho: req.session.carrinho})


    }
    catch (err){
      console.log(err)
      }
  },
  centralDeAtendimento: async (req, res)=>{
    try {
      res.render('central-de-atendimento');
    }
    catch (err){
      console.log(err)
      }
  },

}

module.exports = controlador;