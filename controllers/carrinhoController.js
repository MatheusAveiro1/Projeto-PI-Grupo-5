//Chamando nosso model
const {sequelize, Produto} = require('../models');

const controlador = {
    itens: async (req, res)=> {
      try{

        if(req.query.idProd) {

          console.log('>>>>>> query OK >>>>>>>>>');

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
            
            console.log('>>>>>>> Sessão carrinho existe >>>>>>>>');
            console.log(req.session.carrinho);

            //Criando variavel para conter a informação se o produto existe ou não no carrinho 
            let produtoPesquisado = '';
            //Pesquisando se o produto existe ou não no carrinho
            for(let i = 0; i < req.session.carrinho.length; i++){
              if(req.session.carrinho[i].id == infoProduto.id){
                // req.session.carrinho[i].qt++;
                produtoPesquisado = true;
                break;
              }
            }

            //Se o produto não existir adiciona o protuto atual no carrinho
            if(!produtoPesquisado){
              infoProduto.qt = 1;
              req.session.carrinho.push(infoProduto);

              console.log('>>>>>>> Produto adicionado no carrinho >>>>>>>>');
              console.log(req.session.carrinho);
            }

          } else {            
            req.session.carrinho = []; 
            infoProduto.qt = 1;           
            req.session.carrinho.push(infoProduto);            

            console.log('>>>>>>> Sessão carrinho criada >>>>>>>>');
            console.log(req.session.carrinho);
          }           

          res.render ('carrinho',{carrinho: req.session.carrinho, paginaAtual: 'carrinho'});
          
        } else {
          res.render ('carrinho',{carrinho: req.session.carrinho, paginaAtual: 'carrinho'});
        }
        
      } 

      catch (erro) {
        console.log(erro);
      }
    },
    adicionarQtNoItem: (req, res)=>{
      //Recupera o ID do produto que será adicionado 1 na qt
      let itemParaAdicionarQt = req.params.id;

      console.log(req.session.carrinho);

      //Adicionando 1 na QT do item
      for(let i = 0; i < req.session.carrinho.length; i++) {
        if(req.session.carrinho[i].id == itemParaAdicionarQt){
          req.session.carrinho[i].qt = req.session.carrinho[i].qt + 1;
        }    
      }

      return res.redirect("/carrinho#produto" + req.params.id);

    },
    removerQtNoItem: (req, res)=>{
      //Recupera o ID do produto que será adicionado 1 na qt
      let itemParaAdicionarQt = req.params.id;

      //Removendo 1 na QT do item
      for(let i = 0; i < req.session.carrinho.length; i++) {
        if(req.session.carrinho[i].id == itemParaAdicionarQt){

          if(req.session.carrinho[i].qt >= 2) {
            req.session.carrinho[i].qt = req.session.carrinho[i].qt - 1;
          }
        }    
      }

      return res.redirect("/carrinho#produto" + req.params.id);;

    },
    deletarItemDoCarrinho: (req, res)=>{
      //Recupera o ID do produto que será removido do carrinho
      let itemParaExcluir = req.params.id;      
      //Criar um novo carrinho atualizado (sem o item que foi solicitado a exclusão).
      let carrinhoAtualizado = req.session.carrinho.filter((item) => item.id != itemParaExcluir);
      //Atualiza a session com o novo carrinho
      req.session.carrinho = carrinhoAtualizado;

      return res.redirect("/carrinho");
    },
    limparCarrinho: (req,res)=>{
      delete req.session.carrinho;
      return res.redirect("/carrinho");
    }
  }
  
  module.exports = controlador;