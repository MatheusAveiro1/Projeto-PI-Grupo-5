const funcoes = {

}

const controlador = {
    checkoutEndereco: (req, res)=> {
      res.render ('checkout-endereco', {paginaAtual: 'checkoutEndereco'});
    },
    checkoutPagamento: (req, res)=> {      
      res.render ('checkout-pagamento', {paginaAtual: 'checkoutPagamento'});
    },    
    checkoutConfirmacaoPedido: (req, res)=> {
      res.render ('checkout-confirmacao-pedido', {paginaAtual: 'checkoutConfirmacaoPedido'});
    },
    pedidoConcluido: (req, res)=> {    
      res.render ('pedido-concluido');
    }
  }
  
  module.exports = controlador;