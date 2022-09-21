//Verifica se o pagamento existe, se nao exisir redirecionana para página de pagamento.
function checkCarrinhoPagamentoExisteMiddlewares(req, res, next) {
    if(!req.session.metodoPagamento){        
        return res.redirect('/checkout/checkout-pagamento?pagamentoNaoExiste=true');
    }

    next();
}

module.exports = checkCarrinhoPagamentoExisteMiddlewares;