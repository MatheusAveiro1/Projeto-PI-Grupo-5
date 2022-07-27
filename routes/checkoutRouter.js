var express = require('express');
var router = express.Router();
const checkoutController = require('../controllers/checkoutController');



router.get('/pedido-concluido', checkoutController.pedidoConcluido);

module.exports = router;