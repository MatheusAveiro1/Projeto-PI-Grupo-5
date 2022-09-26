var express = require('express');
var router = express.Router();
const checkoutController = require('../controllers/checkoutController');

//Midllewares
const usuarioNaoLogadoMiddleware = require('../middlewares/usuarioNaoLogadoMiddlewares');
const checkCarrinhoVazioMiddleware = require('../middlewares/checkCarrinhoVazioMidllewares');
const checkCarrinhoEnderecoExisteMiddlewares = require('../middlewares/checkCarrinhoEnderecoExisteMiddlewares');
const checkCarrinhoPagamentoExisteMiddlewares = require('../middlewares/checkCarrinhoPagamentoExisteMiddlewares');

router.get('/checkout-endereco',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.checkoutEndereco);
router.get('/checkout-endereco-escolhido/:id',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkoutController.checkoutEnderecoEscolhido);
router.get('/checkout-pagamento',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkCarrinhoEnderecoExisteMiddlewares,checkoutController.checkoutPagamento);
router.get('/checkout-confirmacao-pedido',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkCarrinhoPagamentoExisteMiddlewares,checkoutController.checkoutConfirmacaoPedido);
router.post('/checkout-gravar-pedido',usuarioNaoLogadoMiddleware,checkCarrinhoVazioMiddleware,checkCarrinhoPagamentoExisteMiddlewares,checkoutController.checkoutGravarPedido);
router.get('/pedido-concluido/:pedido', usuarioNaoLogadoMiddleware,checkoutController.pedidoConcluido);
router.get('/gerar-boleto/:pedido', usuarioNaoLogadoMiddleware,checkoutController.gerarBoleto);

module.exports = router;
