var express = require('express');
var router = express.Router();
const checkoutController = require('../controllers/checkoutController');

//Midllewares
const usuarioNaoLogadoMiddleware = require('../middlewares/usuarioNaoLogadoMiddlewares');
const checkCarrinhoVazioMiddleware = require('../middlewares/checkCarrinhoVazioMidllewares');
const checkCarrinhoEnderecoExisteMiddlewares = require('../middlewares/checkCarrinhoEnderecoExisteMiddlewares');

router.get('/checkout-endereco',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.checkoutEndereco);
router.get('/checkout-endereco-escolhido/:id',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.checkoutEnderecoEscolhido);
router.get('/checkout-pagamento',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkCarrinhoEnderecoExisteMiddlewares,checkoutController.checkoutPagamento);
router.get('/checkout-confirmacao-pedido',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.checkoutConfirmacaoPedido);
router.get('/pedido-concluido',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.pedidoConcluido);

module.exports = router;