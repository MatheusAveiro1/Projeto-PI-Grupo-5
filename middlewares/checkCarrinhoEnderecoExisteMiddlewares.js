//Verifica se o carrinho está vazio, se sim redirecionana para página de carrinho.
function checkCarrinhoEnderecoExisteMiddlewares(req, res, next) {
    if(!req.session.enderecoEscolhido){        
        return res.redirect('/checkout/checkout-endereco?enderecoNaoExiste=true');
    }

    next();
}

module.exports = checkCarrinhoEnderecoExisteMiddlewares;