var express = require('express');
var router = express.Router();
const carrinhoController = require('../controllers/carrinhoController')

/* GET home page. */
router.get('/', carrinhoController.itens);

module.exports = router;