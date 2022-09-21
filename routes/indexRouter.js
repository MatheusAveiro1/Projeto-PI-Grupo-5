var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.index);
router.get('/produtosPorCategoria/:id', indexController.produtosPorCategoria);
router.get('/produtosPorPesquisa', indexController.produtosPorBarraPesquisa);

router.get('/produto/:id', indexController.produto);


module.exports = router;
