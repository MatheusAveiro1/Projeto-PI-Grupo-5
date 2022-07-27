const controlador = {
    login: (req, res)=> {
      res.render ('login')
    },
    cadastro: (req, res)=> {
      res.render ('cadastro')
    },
    perfil: (req, res)=> {
      res.render ('perfil')
    },
    meusDados: (req, res)=> {
      res.render ('meus-dados')
    } 

    }
  
  module.exports = controlador;