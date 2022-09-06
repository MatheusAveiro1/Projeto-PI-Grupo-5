//Chamando nosso model
const {sequelize, Produto} = require('../models');

const controlador = {
    itens: async (req, res)=> {

      try{

        if(req.query.idProd) {
          //Recuperar o ID do Produto
          let idProduto = req.query.idProd;

          //Recupera informação do produto no banco de dados        
          let infoProduto = await Produto.findByPk(idProduto,
            {
              include:[
                  'produto_categoria',
                  'produto_marca'
              ]
          });
          //Refinando as informações do produto
          infoProduto = infoProduto.dataValues;  
          //Criando um sessão com a infomação do produto
          if(req.session.carrinho){
            req.session.carrinho.push(infoProduto);
          } else {
            req.session.carrinho = [];
            req.session.carrinho.push(infoProduto);
          }

          console.log(req.session.carrinho);

          res.render ('carrinho',{carrinho: req.session.carrinho});
        } else {
          res.render ('carrinho',{carrinho: req.session.carrinho});
        }
        
      } 

      catch (erro) {
        console.log(erro);
      }

      
    }
  }
  
  module.exports = controlador;