//Chamando express-validator
const {validationResult, Result} = require('express-validator');
//Chamando o fs
const fs = require('fs');
//Chamando nosso model
const {sequelize, Usuario} = require('../database/models')
//Chamando o manipulado de hash
const bcrypt = require('bcrypt');
const db = require('../database/models');
const { reject } = require('bcrypt/promises');

//** Funções ***//
const funcoesUsuarios = {
  
  verificaErrosDoForm: (req,res)=>{
    return new Promise((resolve,reject) => {
      //Recuperando possiveis erros do form
      let errors = validationResult(req);
      //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
      if (!errors.isEmpty()) {
        
        //Verifica se o usuario fez upload da foto de perfil. Se sim, apaga a foto na pasta avatares
        if (req.file) {
          //Exclui o avatar na pasta avatares 
          fs.rm('./public/images/avatares/' + req.file.filename, { recursive: true }, (err) => {
            if (err) {
              //Se a exclusão falhar
              console.error(err.message);
              return;
            }
          });
        }

        //Retornaremos para page de cadastro com os erros
        reject (res.render('cadastro', { errorsFormCadastro: errors.mapped(), dadosPreenchido: req.body }));
        
      } else {
        resolve();
      }
      
      
    });
  },

  validaCpfEmailExistente: (req,res,cpfParaVerificar,emailParaVerificar)=> {
    return new Promise((resolve, reject) => {
      //Organizando o array vindo do sequelize/BD
      const cpfParaVerificarOrganizado = cpfParaVerificar.map(u => u.toJSON());
      const emailParaVerificarOrganizado = emailParaVerificar.map(u => u.toJSON());

      //verifica se foi retornado um cpf ou o email 
      if (cpfParaVerificarOrganizado.length > 0 || emailParaVerificarOrganizado.length > 0) {

        //Verifica se o usuario fez upload da foto de perfil. Se sim, apaga a foto na pasta avatares
        if (req.file) {
          //Exclui o avatar na pasta avatares 
          fs.rm('./public/images/avatares/' + req.file.filename, { recursive: true }, (err) => {
            if (err) {
              //Se a exclusão falhar
              console.error(err.message);
              return;
            }
          });
        }

        if(cpfParaVerificarOrganizado.length > 0){
          //Retorna o erro para usuário CPF existene
          reject (res.render('cadastro',
          {
            errorsFormCadastro: {
              cpf: {
                param: 'cpf',
                msg: 'Este cpf já existe na base de dados!'
              }
            },
            dadosPreenchido: req.body
          }));
        } else {
          //Retorna o erro para usuário EMAIL existente
          reject( res.render('cadastro',
          {
            errorsFormCadastro: {
              email: {
                param: 'email',
                msg: 'Este e-mail já existe na base de dados!'
              },
            },
            dadosPreenchido: req.body
          }));
        }
      } else {
        resolve();
      }
    });
  },
  
  criarUsuarioParaCadastrarNoBd: (req,res)=>{
    return new Promise((resolve, reject) => {
      let novoUsuario = {}
        //verificando se o usuario enviou foto
        if (req.file === undefined) {
          //Recupera os dados enviados via post pelo form, substitui a senha para senha criptografada e adiciona uma imagem default para o usuario
          resolve(novoUsuario = {
            ...req.body,
            senha: bcrypt.hashSync(req.body.senha, 10),
            foto: "default.jpeg"
          })
        } else {
          //Recupera os dados enviados via post pelo form, substitui a senha para senha criptografada e adiciona a imagem enviada pelo o usuario
          resolve (novoUsuario = {
            ...req.body,
            senha: bcrypt.hashSync(req.body.senha, 10),
            foto: req.file.filename
          })
        }
        reject();
    })
  },

}

//*** Controlador ***//
const controlador = {
  login: (req, res)=> {
    res.render('login', {usuarioCadastrado:req.query.usuarioCadastrado});
  },
  cadastro: (req, res)=> {
    res.render ('cadastro')
  },
  validaCadastro: async (req, res)=> {
    try {
      //Verrifica erros no formulário
      await funcoesUsuarios.verificaErrosDoForm(req,res);
      
      //Consulta o CPF no BD
      const cpfParaVerificar = await Usuario.findAll({
        where: {
          cpf: req.body.cpf
        }
      })

      //Consulta o EMAIL no BD
      const emailParaVerificar = await Usuario.findAll({
        where: {
          email: req.body.email
        }
      })      

      //Valida se o CPF e o EMAIL já existe no BD
      await funcoesUsuarios.validaCpfEmailExistente(req,res,cpfParaVerificar,emailParaVerificar);
      
      //Cria um objeto com as informações do novo usuário
      const usuarioParaCriarNoBd = await funcoesUsuarios.criarUsuarioParaCadastrarNoBd(req,res);      
      
      //Gravando os dados do novo usuário no BD           
      const usuarioCriadoNoBd = await Usuario.create({nome: usuarioParaCriarNoBd.nome,sobrenome: usuarioParaCriarNoBd.sobrenome,email: usuarioParaCriarNoBd.email,senha: usuarioParaCriarNoBd.senha,foto: usuarioParaCriarNoBd.foto,cpf: usuarioParaCriarNoBd.cpf});
      
      //Após o cadastro do usuário redireciona para tela de login
      return res.redirect('/usuarios/login?usuarioCadastrado=' + usuarioParaCriarNoBd.nome + ' ' + usuarioParaCriarNoBd.sobrenome);
    
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