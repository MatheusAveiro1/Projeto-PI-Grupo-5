//Chamando nosso model
const {sequelize, Endereco} = require('../models');

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
      res.render ('checkout-pagamento', {paginaAtual: 'checkoutPagamento', carrinho: req.session.carrinho});
    },    
    checkoutConfirmacaoPedido: (req, res)=> {
      res.render ('checkout-confirmacao-pedido', {paginaAtual: 'checkoutConfirmacaoPedido', carrinho: req.session.carrinho});
    },
    pedidoConcluido: (req, res)=> {    
      res.render ('pedido-concluido');
    }
  }
  
  module.exports = controlador;