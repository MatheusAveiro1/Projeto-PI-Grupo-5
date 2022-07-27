var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')


router.get('/login', usuariosController.login); 
router.get('/cadastro', usuariosController.cadastro);
router.get('/perfil', usuariosController.perfil);
router.get('/meus-dados', usuariosController.meusDados);

module.exports = router;