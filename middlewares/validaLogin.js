//Chamando express-validator
const {check} = require('express-validator');

module.exports = [
    check('email')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isEmail().withMessage("Por favor preencha uma e-mail válido!").bail(),
    check('senha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
]