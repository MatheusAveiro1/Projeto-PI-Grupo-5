var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')
const uploadFile = require('../middlewares/multerMiddlewares');
const validaFormCadastroMiddlewares = require('../middlewares/validacadastro');


router.get('/login', usuariosController.login); 
router.get('/cadastro', usuariosController.cadastro);
router.post('/cadastro',uploadFile.single('foto_de_perfil'), validaFormCadastroMiddlewares, usuariosController.validaCadastro);
router.get('/perfil', usuariosController.perfil);
router.get('/meus-dados', usuariosController.meusDados);

module.exports = router;