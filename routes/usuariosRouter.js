var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')
const uploadFile = require('../middlewares/multerMiddlewares');
const validaFormCadastroMiddlewares = require('../middlewares/validaCadastro');
const validaLogin = require('../middlewares/validaLogin');

//rota get e post da pagina de login
router.get('/login', usuariosController.login); 
router.post('/login',validaLogin, usuariosController.validaLogin); 

//rota get e post da pagina de cadastro
router.get('/cadastro', usuariosController.cadastro);
router.post('/cadastro',uploadFile.single('foto_de_perfil'), validaFormCadastroMiddlewares, usuariosController.validaCadastro);

//rota get e post da pagina de perfil 
router.get('/perfil', usuariosController.perfil);
router.get('/meus-dados', usuariosController.meusDados);

module.exports = router;