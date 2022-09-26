var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController');

//chamada dos middlewares
const uploadFile = require('../middlewares/multerMiddlewares');
const validaFormCadastroMiddlewares = require('../middlewares/validaCadastro');
const validaLogin = require('../middlewares/validaLogin');
const usuarioNaoLogadoMiddleware = require('../middlewares/usuarioNaoLogadoMiddlewares');
const usuarioLogadoMiddleware = require('../middlewares/usuarioLogadoMiddleware');
const validaEnderecoMiddlewares = require('../middlewares/validaEnderecoMiddlewares');
const validaAtualizacaoMeusDadosMiddlewares = require('../middlewares/validaAtualizacaoMeusDadosMiddlewares');
const validaAlterarSenha = require('../middlewares/validaAlterarSenha');

//rota get e post da pagina de login
router.get('/login',usuarioLogadoMiddleware, usuariosController.login); 
router.post('/login',usuarioLogadoMiddleware, validaLogin, usuariosController.validaLogin); 

//rota post da pagina altarar senha
router.get('/alterar-senha', usuarioNaoLogadoMiddleware, usuariosController.alterarSenha); 
router.put('/alterar-senha', usuarioNaoLogadoMiddleware, validaAlterarSenha, usuariosController.ValidaAlterarSenha); 

//rota get e post da pagina de cadastro
router.get('/cadastro',usuarioLogadoMiddleware, usuariosController.cadastro);
router.post('/cadastro',usuarioLogadoMiddleware, uploadFile.single('foto_de_perfil'), validaFormCadastroMiddlewares, usuariosController.validaCadastro);

//rota get e post da pagina de perfil 
router.get('/perfil',usuarioNaoLogadoMiddleware, usuariosController.perfil);
router.get('/meus-dados',usuarioNaoLogadoMiddleware, usuariosController.meusDados);
router.put('/meus-dados',usuarioNaoLogadoMiddleware, validaAtualizacaoMeusDadosMiddlewares, usuariosController.atualizarMeusDados);

//Rota get da página Meus Pedidos
router.get('/meus-pedidos',usuarioNaoLogadoMiddleware, usuariosController.meusPedidos);

//rota de endereço
router.get('/enderecos',usuarioNaoLogadoMiddleware, usuariosController.mostraEnderecos);
router.get('/enderecos/criar',usuarioNaoLogadoMiddleware, usuariosController.criarEndereco);
router.post('/enderecos/criar',usuarioNaoLogadoMiddleware,validaEnderecoMiddlewares, usuariosController.cadastrarEndereco);
router.post('/enderecos/editar',usuarioNaoLogadoMiddleware, usuariosController.editarEndereco);
router.put('/enderecos/atualizar',usuarioNaoLogadoMiddleware, validaEnderecoMiddlewares, usuariosController.atualizarEndereco);
router.delete('/enderecos/delete',usuarioNaoLogadoMiddleware, usuariosController.deletarEndereco);

//rota logout
router.get('/logout',usuarioNaoLogadoMiddleware, usuariosController.logout);

module.exports = router;