var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);
router.get('/produto', indexController.produto);


module.exports = router;
