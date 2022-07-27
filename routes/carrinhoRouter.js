var express = require('express');
var router = express.Router();
const carrinhoController = require('../controllers/carrinhoController')


router.get('/', carrinhoController.itens);

module.exports = router;