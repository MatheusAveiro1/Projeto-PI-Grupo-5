//Chamando express-validator
const {check} = require('express-validator');

module.exports = [
    check('rua')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('numero')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail(),
    check('complemento')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('cep')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail()
        .isLength({min: 8, max: 8}).withMessage("Digite o CEP com 8 números!"), 
    check('bairro')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('cidade')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),       
    check('estado')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isAlpha().withMessage("Esse campo só aceita 2 letras!").bail()
        .isLength({min: 2, max: 2}).withMessage("Digite a sigla do estado apenas com 2 letras!"),        
]