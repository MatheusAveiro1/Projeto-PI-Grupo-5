//Chamando express-validator
const {validationResult, Result} = require('express-validator');
//Chamando o fs
const fs = require('fs');
//Chamando nosso model
const {sequelize, Usuario, Endereco} = require('../models')
//Chamando o manipulado de hash
const bcrypt = require('bcrypt');
const db = require('../models');
const { reject, promise } = require('bcrypt/promises');
const { resolve } = require('path');


//** Funções ***//

const funcoesUsuarios = {
  
  verificaErrosDoFormLogin: (req, res) => {
    return new Promise((resolve, reject) => {
      //Recuperando possiveis erros do form
      let errors = validationResult(req);
      //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
      if (!errors.isEmpty()) {
        //Retornaremos para page de cadastro com os erros
        reject(res.render('login', { errors: errors.mapped(), dadosPreenchido: req.body }));
      } else {
        resolve();
      }
    });
  },

  validaEmailSenhaLogin: (req, res, usuarioParaVerificar) =>{

    return new Promise((resolve, reject) => {

      //Verifica se veio infomação do usuário ou não
      if(usuarioParaVerificar.length>0){

        //organizando o array
        let usuarioParaLogin = usuarioParaVerificar.map(u => u.toJSON());

        //trasnformando o array em objeto
        usuarioParaLogin = usuarioParaLogin[0]

        //Comparando a senha do post com a senha criptografada da base de dados
        let senhaVerificada = bcrypt.compareSync(req.body.senha, usuarioParaLogin.senha);

        if(senhaVerificada)
        {
          //Iniciando sessão
          delete usuarioParaLogin.senha;
          //resolve(console.log(usuarioParaLogin))

          req.session.usuarioLogado = usuarioParaLogin;

          //resolve(console.log(req.session.usuarioLogado))
          
          if(req.body.lembrarUsuario){
              res.cookie('emailDoUsuario', req.body.email, {maxAge: (1000 * 60) * 30});
          }

          resolve(res.redirect('/usuario/perfil'));

        }else{
          reject(res.render('login', {falhaLogin: "Usuário ou Senha incorreto!", dadosPreenchido: req.body}))
        }

      }else{

       //Retorna o erro para usuário
       reject(res.render('login', {falhaLogin: "Usuário ou Senha incorreto!", dadosPreenchido: req.body}));

      }

    })   
  },

  verificaErrosDoFormCadastro: (req,res)=>{
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
          }
          
          )
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

  verificaErrosDoFormCriarEndereco: (req,res)=>{
    return new Promise((resolve,reject) => {
      //Recuperando possiveis erros do form
      let errors = validationResult(req);
      //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
      if (!errors.isEmpty()) {
        //Retornaremos para page de cadatro de endereço com os erros
        reject (res.render('cadastroDeEndereco', { errorsFormEndereco: errors.mapped(), dadosPreenchido: req.body, paginaAtual: 'enderecos'}));
      } else {
        resolve();
      }
    });
  },

  verificaErrosDoFormAtualizarEndereco: (req,res)=>{
    return new Promise((resolve,reject) => {
      //Recuperando possiveis erros do form
      let errors = validationResult(req);
      //Verifica se houve erros no formulário, se sim, devolve os erros para que o usuário
      if (!errors.isEmpty()) {
        //Retornaremos para page de cadatro de endereço com os erros
        reject (res.render('editarEndereco', { errorsFormEndereco: errors.mapped(), endereco: req.body, paginaAtual: 'enderecos'}));
      } else {
        resolve();
      }
    });
  }
}

//*** Controlador ***//
const controlador = {
  login: (req, res) => {
    res.render('login', { usuarioCadastrado: req.query.usuarioCadastrado, carrinho: req.session.carrinho });
  },
  validaLogin: async (req, res) => {
    try{
      //verifica erros no formulario
      await funcoesUsuarios.verificaErrosDoFormLogin(req, res);
      //Consulta o EMAIL no BD
      const usuarioParaVerificar = await Usuario.findAll({
        where: {
          email: req.body.email 
        }
      }) 
      //verifica email e senha no banco de dados
      await funcoesUsuarios.validaEmailSenhaLogin(req, res, usuarioParaVerificar);
    }
    catch (err) {
      console.log(err)
    }
  },

  cadastro: (req, res)=> {
    res.render ('cadastro')
  },
  validaCadastro: async (req, res)=> {
    try {
      //Verifica erros no formulário
      await funcoesUsuarios.verificaErrosDoFormCadastro(req,res);
      
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
      return res.redirect('/usuario/login?usuarioCadastrado=' + usuarioParaCriarNoBd.nome + ' ' + usuarioParaCriarNoBd.sobrenome);
    
    }
    catch (err) {
      console.log(err)
    }
  },
  perfil: (req, res)=> {

   return res.render('perfil',{usuarioLogado: req.session.usuarioLogado, paginaAtual: 'perfil'})
    
  },
  meusDados: (req, res)=> {
    const meusDados = req.session.usuarioLogado
    console.log('>>>>>>>teste cadastroOk<<<<<<<<')
    console.log(req.session.cadstroOk )
    var cadastroOk = req.session.cadstroOk
    req.session.cadstroOk = 0
    
   return res.render ('meus-dados', {meusDados: meusDados, paginaAtual: 'meusDados',cadastroOk: cadastroOk })
  },

  
  atualizarMeusDados: async (req, res) =>{

      try{

  


        const resultadoDoEnvioDeDadosDoBanco =  await Usuario.update({
          nome: req.body.nome,
          sobrenome: req.body.sobrenome,
          email: req.session.usuarioLogado.email,
          cpf: req.body.cpf,
          rg: req.body.rg,
          telefone: req.body.tel,
          data_nascimento: req.body.data_nasc


        },
        { where: { id: req.session.usuarioLogado.id} }
        )

        
        
        req.session.cadstroOk = resultadoDoEnvioDeDadosDoBanco

        return res.redirect('/usuario/meus-dados'); 
        
      }   
      catch (err) {
          console.log(err)
      }

    },



   
  

  mostraEnderecos: async (req, res) =>{

    try{
       const enderecos = await Endereco.findAll({
        where: {
            id_usuario: req.session.usuarioLogado.id
        }
     })
   
     return res.render ('enderecos', {enderecos: enderecos, paginaAtual: 'enderecos', statusEndereco: {status: req.query.statusEndereco}, statusEnderecoErro: req.query.statusEnderecoErro})
    }
    catch (err) {
      if(err){
        console.log(err);
        res.send('ANTENÇÃO!!! No momento não é possivel acessar a página de ENDEREÇOS por causa do seguinto ERRO: "' + err + '"');
      }
    }

  },
  criarEndereco: (req, res) =>{    
    return res.render ('cadastroDeEndereco', {paginaAtual: 'enderecos'});
  },  
  cadastrarEndereco: async (req, res) =>{

    try{      
      //verifica erros no formulario
      await funcoesUsuarios.verificaErrosDoFormCriarEndereco(req, res);
      
      //Gravando os dados do novo endereço no BD           
      await Endereco.create({
        id_usuario: req.session.usuarioLogado.id,
        rua: req.body.rua,
        numero: req.body.numero,
        complemento: req.body.complemento,
        cep: req.body.cep,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado
      });
      
      //Após o cadastro de endereco redireciona para tela de endereco
      return res.redirect('/usuario/enderecos?statusEndereco=cadastradoSucesso');

    }
    catch (err) {
      if(err){
        console.log(err);
        res.redirect('/usuario/enderecos?statusEnderecoErro=' + err);
      }
    }

  },  
  editarEndereco: async (req, res) =>{
    try{
      const endereco = await Endereco.findByPk(req.body.endereco_para_editar);
      res.render('editarEndereco',{paginaAtual: 'enderecos', endereco: endereco});
    }
   catch (err) {
     console.log(err)
    }
  },
  atualizarEndereco: async (req, res) =>{
    try{      
      //verifica erros no formulario
      await funcoesUsuarios.verificaErrosDoFormAtualizarEndereco(req, res);

      const result = await Endereco.update({ 
          id_usuario: req.session.usuarioLogado.id,
          rua: req.body.rua,
          numero: req.body.numero,
          complemento: req.body.complemento,
          cep: req.body.cep,
          bairro: req.body.bairro,
          cidade: req.body.cidade,
          estado: req.body.estado 
        },
        { where: { id: req.body.endereco_para_atualizar } })                
      
      res.redirect('/usuario/enderecos?statusEndereco=atualizadoSucesso');
    }
   catch (err) {
      if(err){
        console.log(err);
        res.redirect('/usuario/enderecos?statusEnderecoErro=' + err);
      }
    }
  },
  deletarEndereco: async (req, res) =>{

    try{

       await Endereco.destroy({
        where: { id: req.body.endereco_para_excluir},
      });

      
      return res.redirect('/usuario/enderecos?statusEndereco=deletadoSucesso')
    }
  
    
   
   catch (err) {
     console.log(err)
   }

  },
  logout: (req, res)=>{

    res.clearCookie("emailDoUsuario")
    req.session.destroy()

    return res.redirect("/")
  }    
}
  
  module.exports = controlador;