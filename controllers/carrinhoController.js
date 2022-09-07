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

          //Verificando se a sessão "carrinho" existe
          if(req.session.carrinho){           
            //Criando variavel para conter a informação se o produto existe ou não no carrinho 
            let produtoPesquisado = '';
            //Pesquisando se o produto existe ou não no carrinho
            for(let i = 0; i < req.session.carrinho.length; i++){
              if(req.session.carrinho[i].id == infoProduto.id){
                req.session.carrinho[i].qt++;
                produtoPesquisado = true;
                break;
              }
            }

            //Se o produto não existir adiciona o protuto atual no carrinho
            if(!produtoPesquisado){
              infoProduto.qt = 1;
              req.session.carrinho.push(infoProduto);
            }

          } else {
            req.session.carrinho = []; 
            infoProduto.qt = 1;           
            req.session.carrinho.push(infoProduto);
          }           

          res.render ('carrinho',{carrinho: req.session.carrinho});
          
        } else {
          res.render ('carrinho',{carrinho: req.session.carrinho});
        }
        
      } 

      catch (erro) {
        console.log(erro);
      }

      
    },
    deletarItem: (req, res)=>{

    },
    limparCarrinho: (req,res)=>{

    }
  }
  
  module.exports = controlador;