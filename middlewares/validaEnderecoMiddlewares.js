//Chamando express-validator
const {check} = require('express-validator');

module.exports = [
    check('rua')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('numero')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('complemento')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('cep')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail(), 
    check('bairro')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('cidade')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),       
    check('estado')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),  
        
]