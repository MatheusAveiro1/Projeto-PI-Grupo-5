var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')

//chamada dos middlewares
const uploadFile = require('../middlewares/multerMiddlewares');
const validaFormCadastroMiddlewares = require('../middlewares/validaCadastro');
const validaLogin = require('../middlewares/validaLogin');
const usuarioNaoLogadoMiddleware = require('../middlewares/usuarioNaoLogadoMiddlewares')
const usuarioLogadoMiddleware = require('../middlewares/usuarioLogadoMiddleware')

//rota get e post da pagina de login
router.get('/login',usuarioLogadoMiddleware, usuariosController.login); 
router.post('/login',validaLogin, usuariosController.validaLogin); 

//rota get e post da pagina de cadastro
router.get('/cadastro',usuarioLogadoMiddleware, usuariosController.cadastro);
router.post('/cadastro',usuarioLogadoMiddleware, uploadFile.single('foto_de_perfil'), validaFormCadastroMiddlewares, usuariosController.validaCadastro);

//rota get e post da pagina de perfil 
router.get('/perfil',usuarioNaoLogadoMiddleware, usuariosController.perfil);
router.get('/meus-dados',usuarioNaoLogadoMiddleware, usuariosController.meusDados);


//rota de endereço
router.get('/enderecos',usuarioNaoLogadoMiddleware, usuariosController.mostraEnderecos);
router.get('/enderecos/criar',usuarioNaoLogadoMiddleware, usuariosController.criarEndereco);
router.post('/enderecos/criar',usuarioNaoLogadoMiddleware, usuariosController.cadastrarEndereco);
//router.post('/enderecos/editar',usuarioNaoLogadoMiddleware, usuariosController.editarEndereco);
router.post('/enderecos/delete',usuarioNaoLogadoMiddleware, usuariosController.deletarEndereco);

//rota logout
router.get('/logout',usuarioNaoLogadoMiddleware, usuariosController.logout);

module.exports = router;