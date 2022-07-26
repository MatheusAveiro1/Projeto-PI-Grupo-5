var express = require('express');
var router = express.Router();
const produtosController = require('../controllers/produtosController')

/* GET home page. */
router.get('/', produtosController.mostraProduto);

module.exports = router;
