const {sequelize, Usuario} = require('../models');

async function dadosDoUsuarioLogadoMiddleware  (req, res, next) {
    res.locals.usuarioEstaLogado = false;

    //Email salvo no cookie    
    const emailDoCookie = req.cookies.emailDoUsuario;
    
   
    //Busca informação na base de dados passando email
    let usuarioDoCookie = ""

    if(emailDoCookie){
    
        usuarioDoCookie = await Usuario.findOne({
        where: {
        email: emailDoCookie
        }
        })
                
    }
    
    //se o usuário for encontrado passa as informações para logar o usuário
    if (usuarioDoCookie){
        ///deleta a senha para não ficar na session        
       delete usuarioDoCookie.senha;
        //Cria a session com as informações recuperadas do cookie 
        req.session.usuarioLogado = usuarioDoCookie;      
    }

    if(req.session.usuarioLogado){
        res.locals.usuarioEstaLogado = true;
    }

    next();
}

module.exports = dadosDoUsuarioLogadoMiddleware;