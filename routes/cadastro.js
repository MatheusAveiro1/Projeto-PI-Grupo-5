var express = require('express');
var router = express.Router();
const cadastroController = require('../controllers/cadastroController')


router.get('/', cadastroController.cadastro);

module.exports = router;