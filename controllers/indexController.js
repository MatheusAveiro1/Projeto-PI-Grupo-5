const fs = require('fs');//metodo fs Manipulador de arquivos
const {sequelize, Produto, Categoria} = require('../models');

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
            
      res.render('index', {produtos: produtos, carrinho: req.session.carrinho})

    }
    catch (err){
      console.log(err)
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
  }
    

  

  
}

module.exports = controlador;