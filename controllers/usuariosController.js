//Chamando express-validator
const {validationResult} = require('express-validator');
const fs = require('fs');

const controlador = {
  login: (req, res)=> {
    res.render ('login')
  },
  cadastro: (req, res)=> {
    res.render ('cadastro')
  },
  validaCadastro: (req, res)=> {

  //Recuperando possiveis erros do form
  let errors = validationResult(req);

    //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
    if(!errors.isEmpty()){
      //Retornaremos para page de cadastro com os erros
      return res.render('cadastro', {errorsFormCadastro: errors.mapped(), dadosPreenchido: req.body});       
    }

    return res.send("Cadastro realizado com sucesso.");
  },
  perfil: (req, res)=> {
    res.render ('perfil')
  },
  meusDados: (req, res)=> {
    res.render ('meus-dados')
  }    
}
  
  module.exports = controlador;