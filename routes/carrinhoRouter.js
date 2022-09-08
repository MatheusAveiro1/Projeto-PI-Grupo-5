var express = require('express');
var router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');

router.get('/', carrinhoController.itens);
router.get('/limparCarrinho', carrinhoController.limparCarrinho);
router.get('/deletarItem/:id', carrinhoController.deletarItemDoCarrinho);
router.get('/adicionarQtNoItem/:id', carrinhoController.adicionarQtNoItem);
router.get('/removerQtNoItem/:id', carrinhoController.removerQtNoItem);

module.exports = router;