var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController')


router.get('/', loginController.login);

module.exports = router;