function usuarioLogadoMiddleware(req, res, next) {
    if(req.session.usuarioLogado){
        return res.redirect('/usuario/perfil');
    }

    next();
}

module.exports = usuarioLogadoMiddleware;