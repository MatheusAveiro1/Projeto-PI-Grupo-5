//Chamando express-validator
const {validationResult, Result} = require('express-validator');
//Chamando o fs
const fs = require('fs');
//Chamando nosso model
const {sequelize, Usuario} = require('../models')
//Chamando o manipulado de hash
const bcrypt = require('bcrypt');
const db = require('../models');


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
    if (!errors.isEmpty()) {
      //Retornaremos para page de cadastro com os erros
      return res.render('cadastro', { errorsFormCadastro: errors.mapped(), dadosPreenchido: req.body });
    }

    async function verificaEmailExixtente(){
      try {
        //aguardando o sequilize criar o usuario no banco de dados
        const usuarioVerificado = await Usuario.findAll({
          where: {
            email: req.body.email
          }
        })
        

        const resultadoUsuarioVerificado = usuarioVerificado.map(u => u.toJSON())

        if (resultadoUsuarioVerificado[0].email) {
         
          //Excluir o avatar na pasta de upload            
          fs.rm('./public/images/avatares/' + req.file.filename, { recursive:true }, (err) => {
            if(err){
                // Se a exclusão falhar
                console.error(err.message);
                return;
            }                
        });


          return res.send('email existe')
        }

      }
      catch (err) {
        console.log(err)
      }

      
   };

   verificaEmailExixtente()
    
    function buscaInfoUsusarios () {
      //return JSON.parse(fs.readFileSync(this.nomeDoArquivo, 'utf-8'));
  }

    function buscaUsusarioPeloCampo (campo, value) {
    
      // let todosUsuarios = this.buscaInfoUsusarios();
      // let ususrioProcurado = todosUsuarios.find(usuario => usuario[campo] === value);
      // return ususrioProcurado;
  }

    //Verifica se o usuário existe
    let usuarioExiste = buscaUsusarioPeloCampo('email', req.body.email);
    if(usuarioExiste) {
        //Excluir o avatar na pasta de upload            
        fs.rm('./public/images/avatar/' + req.file.filename, { recursive:true }, (err) => {
            if(err){
                // Se a exclusão falhar
                console.error(err.message);
                return;
            }                
        });

        //Retorna o erro para usuário
        return res.render('cadastroUsuario', 
        {
            errors: {
                email: { 
                    param: 'email',
                    msg:'Este e-mail já existe na base de dados!'
                },                   
            },
            dadosPreenchido: req.body
        });
    }

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


    //gravando dados na banco de dados - usuario
      async function criarUsuarios(){

      try {
        //aguardando o sequilize criar o usuario no banco de dados
        await Usuario.create({ nome: usuarioParaCriar.nome, sobrenome: usuarioParaCriar.sobrenome, email: usuarioParaCriar.email, senha: usuarioParaCriar.senha, foto: usuarioParaCriar.foto })
        
        return res.send("Cadastro realizado com sucesso.");
      }
      catch (err) {
        console.log(err)
      }

      
   };
    criarUsuarios()
    
  },
  perfil: (req, res)=> {
    res.render ('perfil')
  },
  meusDados: (req, res)=> {
    res.render ('meus-dados')
  }    
}
  
  module.exports = controlador;