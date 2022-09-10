function usuarioNaoLogadoMiddleware(req, res, next) {
    if(!req.session.usuarioLogado){
        
        if(req.query.linkCarrinho){
            return res.redirect('/usuario/login?linkCarrinho=' + req.query.linkCarrinho);
        } else {
            return res.redirect('/usuario/login');
        }        
    }

    next();
}

module.exports = usuarioNaoLogadoMiddleware;
