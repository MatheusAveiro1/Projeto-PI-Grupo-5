function usuarioNaoLogadoMiddleware(req, res, next) {
    if(!req.session.usuarioLogado){
        return res.redirect('/usuario/login');
    }

    next();
}

module.exports = usuarioNaoLogadoMiddleware;
