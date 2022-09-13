//Verifica se o carrinho está vazio, se sim redirecionana para página de carrinho.
function checkCarrinhoVazioMiddleware(req, res, next) {
    if(!req.session.carrinho || req.session.carrinho == ''){        
        return res.redirect('/carrinho');
    }

    next();
}

module.exports = checkCarrinhoVazioMiddleware;