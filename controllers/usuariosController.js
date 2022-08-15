//Chamando express-validator
const {validationResult, Result} = require('express-validator');
//Chamando o fs
const fs = require('fs');
//Chamando nosso model
const {sequelize, Usuario} = require('../models')
//Chamando o manipulado de hash
const bcrypt = require('bcrypt');
const db = require('../models');
const { reject } = require('bcrypt/promises');

//** Funções ***






const controlador = {
  login: (req, res)=> {
    res.render('login', {usuarioCadastrado:req.query.usuarioCadastrado});
  },
  cadastro: (req, res)=> {
    res.render ('cadastro')
  },
  validaCadastro: async (req, res)=> {

    try {

        //Recuperando possiveis erros do form
        let errors = validationResult(req);
        //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
        if (!errors.isEmpty()) {
          //Retornaremos para page de cadastro com os erros
          return res.render('cadastro', { errorsFormCadastro: errors.mapped(), dadosPreenchido: req.body });
        }

        //------------------------------------------------------
        
        //-----------------------------------------------------------------------------------------------

        //Aguardando o sequilize buscar o cpf no banco de dados
        const usuarioVerificadoCpf = await Usuario.findAll({
          where: {
            cpf: req.body.cpf
          }
      })
      //Organizando o array  do banco de dados
      const resultadoUsuarioVerificadoCpf = usuarioVerificadoCpf.map(u => u.toJSON())
      //verifica cpf exitente dentro do banco
      if (resultadoUsuarioVerificadoCpf.length > 0) {
        //Retorna o erro para usuário
        return res.render('cadastro',
          {
            errorsFormCadastro: {
              cpf: {
                param: 'cpf',
                msg: 'Este cpf já existe na base de dados!'
              }
            },
            dadosPreenchido: req.body
          });
        }
        console.log("não existe este cpf no banco")
        //--------------------------------------------------------------------------------------------------

        //-----------------------------------------------------------------------------------------------

        //Aguardando o sequilize buscar o email no banco de dados
        const usuarioVerificado = await Usuario.findAll({
            where: {
              email: req.body.email
            }
        })
        //Organizando o array  do banco de dados
        const resultadoUsuarioVerificado = usuarioVerificado.map(u => u.toJSON())
        //verifica email exitente dentro do banco
        if (resultadoUsuarioVerificado.length > 0) {
          //se existir email igual, ele Verificando se o usuario fez algum upload
          if (req.file) {
            //Exclui o avatar na pasta de upload 
            fs.rm('./public/images/avatares/' + req.file.filename, { recursive: true }, (err) => {
              if (err) {
                // Se a exclusão falhar
                console.error(err.message);
                return;
              }
            });
          }
          //Retorna o erro para usuário
          return res.render('cadastro',
            {
              errorsFormCadastro: {
                email: {
                  param: 'email',
                  msg: 'Este e-mail já existe na base de dados!'
                },
              },
              dadosPreenchido: req.body
            });
          }

          //--------------------------------------------------------------------------------------------------
    
        let usuarioParaCriar = {}
        //verificando se o usuario enviou foto
        if (req.file === undefined) {
          //Recupera os dados enviados via post pelo form, substitui a senha para senha criptografada e adiciona uma imagem default para o usuario
          usuarioParaCriar = {
            ...req.body,
            senha: bcrypt.hashSync(req.body.senha, 10),
            foto: "default.jpeg"
          }
        } else {
          //Recupera os dados enviados via post pelo form, substitui a senha para senha criptografada e adiciona a imagem enviada pelo o usuario
          usuarioParaCriar = {
            ...req.body,
            senha: bcrypt.hashSync(req.body.senha, 10),
            foto: req.file.filename
          }
        }

      //--------------------------------------------------------------------------------------------------
      //Gravando dados na banco de dados - usuario
      //aguardando o sequilize criar o usuario no banco de dados
        await Usuario.create({ nome: usuarioParaCriar.nome, sobrenome: usuarioParaCriar.sobrenome, email: usuarioParaCriar.email, senha: usuarioParaCriar.senha, foto: usuarioParaCriar.foto, cpf: usuarioParaCriar.cpf})
        return res.redirect('/usuarios/login?usuarioCadastrado=' + usuarioParaCriar.nome + ' ' + usuarioParaCriar.sobrenome);
    
     }
     catch (err) {
      console.log(err)
     }
  },
  perfil: (req, res)=> {
    res.render ('perfil')
  },
  meusDados: (req, res)=> {
    res.render ('meus-dados')
  }    
}
  
  module.exports = controlador;