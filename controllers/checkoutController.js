//Chamando nosso model
const { localsName } = require('ejs');
const {sequelize, Endereco, Pedido, ProdutoHasPedido} = require('../models');

const funcoes = {
  
}

const controlador = {
    checkoutEndereco: async (req, res)=> {
      try{
        //Pegando o ID do usuário
        const idUsuario = req.session.usuarioLogado.id;
        //Buscando os endereços no BD 
        const enderecos = await Endereco.findAll({
          where: {
              id_usuario: idUsuario
          }
        });

        //Recuperando a variavel que diz se o usuário escolheu um endereço ou não.
        let enderecoNaoExiste = req.query.enderecoNaoExiste

        if(req.session.enderecoEscolhido) {
          enderecoEscolhido = req.session.enderecoEscolhido;
        } else {
          enderecoEscolhido = ''
        }
        
        //Adssionando a transportadora no carrinho
        if(!req.session.transportadora) {
          req.session.transportadora = "TopSales Trans"
        }
        
        res.render ('checkout-endereco', {paginaAtual: 'checkoutEndereco',
                                          enderecos: enderecos,
                                          enderecoEscolhido: enderecoEscolhido,
                                          enderecoNaoExiste: enderecoNaoExiste,
                                          carrinho: req.session.carrinho,
                                          enderecoCadastrado: req.query.enderecoCadastrado});
      }
      catch (err) {
        if(err){
          console.log(err);
          // res.send('ANTENÇÃO!!! No momento não é possivel acessar a página de ENDEREÇOS por causa do seguinto ERRO: "' + err + '"');
        }
      }      
    },
    checkoutEnderecoEscolhido: async(req, res)=> {
      try{
        //Pegando o ID do usuário
        const idUsuario = req.session.usuarioLogado.id;
        //Buscando os endereços no BD 
        const enderecos = await Endereco.findAll({
          where: {
              id_usuario: idUsuario
          }
        });
        
        //Pegando o ID do endereço escolhido
        let enderecoEscolhido = req.params.id;
        //Buncando endereço escolhico no BD
        enderecoEscolhido = await Endereco.findByPk(enderecoEscolhido);
        
        //Criando o endereço na session
        req.session.enderecoEscolhido = enderecoEscolhido;

        res.render ('checkout-endereco', {paginaAtual: 'checkoutEndereco', enderecos: enderecos, enderecoEscolhido: enderecoEscolhido, carrinho: req.session.carrinho});
      }
      catch (err) {
        if(err){
          console.log(err);
          // res.send('ANTENÇÃO!!! No momento não é possivel acessar a página de ENDEREÇOS por causa do seguinto ERRO: "' + err + '"');
        }
      }           
    },
    checkoutPagamento: (req, res)=> {  
      //Adicionando metodos de pagamento na seção
      req.session.metodoPagamento = "Boleto";  

      //recuperado varialvel que diz se o usuario escolheu o metodo de pagamento
      let pagamentoNaoExiste = req.query.pagamentoNaoExiste;

      res.render ('checkout-pagamento', {paginaAtual: 'checkoutPagamento', pagamentoNaoExiste: pagamentoNaoExiste , carrinho: req.session.carrinho});
    },    
    checkoutConfirmacaoPedido: (req, res)=> {
      //Recuperando informações do pedido para revisao
      const meusDados = req.session.usuarioLogado;
      const endereco = req.session.enderecoEscolhido;
      const metodoPagamento = req.session.metodoPagamento;
      const produtos = req.session.carrinho;

      res.render ('checkout-confirmacao-pedido', {paginaAtual: 'checkoutConfirmacaoPedido',
        carrinho: req.session.carrinho,
        meusDados: meusDados,
        endereco: endereco,
        metodoPagamento: metodoPagamento,
        produtos: produtos            
      });
    },
    checkoutGravarPedido: async (req, res)=> {
      try {
        //Verificando se foi clicado no botão "Finalizar Pedido"
        if(req.body.gravarPedido == 'true') {
          //Recuperando id do usuário
          const idUsuario = req.session.usuarioLogado.id;

          //Recuperando endereço de entrega
          let endereco = req.session.enderecoEscolhido;
          endereco = `${endereco.destinatario}, ${endereco.rua}, ${endereco.numero}, ${endereco.complemento}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}, ${endereco.cep}`;

          //Recuperando as informações dos produtos
          const produtos = req.session.carrinho;

          //Calculando o preço total
          let precoTotal = 0;
          for(let i = 0; i < produtos.length; i++) {
            precoTotal = precoTotal + (produtos[i].preco * produtos[i].qt);
          }
          precoTotal = (precoTotal / 10) * 9.5;
          
          //Definindo o status do pedido
          const statusPedido = "Pendente";

          //Definindo o status do pedido
          const metodoPagamento = req.session.metodoPagamento;

          console.log(req.session);

          //Gravando as informações do pedido no BD e pegando o retorno e salvando na variavel infoPedido
          const infoPedido =  await Pedido.create({
            id_usuario: idUsuario,
            endereco: endereco,
            preco_total: precoTotal,
            metodo_pagamento: metodoPagamento,
            status: statusPedido            
          });

          for (let i = 0; i < produtos.length; i++) {
            //Gravando os produtos do pedino na tabela intermediaria
            await ProdutoHasPedido.create({
              pedidos_id: infoPedido.id,
              produtos_id: produtos[i].id,
              qt_produto: produtos[i].qt,              
              preco_produto: (produtos[i].preco / 10) * 9.5           
            });
          }          

          //Excluindo dados do carrinho
          delete req.session.carrinho;
          delete req.session.transportadora;
          delete req.session.enderecoEscolhido;
          delete req.session.metodoPagamento;
          
          res.redirect('/checkout/pedido-concluido/' + infoPedido.id);

        } else {
          res.redirect('/carrinho');
        }

        
      }
      catch (err) {
        console.log(err);
      }
    },
    pedidoConcluido: (req, res)=> {    
      res.render ('pedido-concluido');
    }
  }
  
  module.exports = controlador;