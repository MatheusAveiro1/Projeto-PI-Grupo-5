//Chamando express-validator
const {check} = require('express-validator');
//Chamando o Path
const path = require('path');

module.exports = [
    check('nome')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),               
    check('sobrenome')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),        
    check('cpf')        
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail()
        .isLength({min: 11, max: 11}).withMessage("Digite um CPF válido!"),
    check('email')
        .notEmpty().withMessage("Esse campo não pode ficar vazio e não pode ser alterado!").bail()
        .isEmail().withMessage("Por favor preencha uma e-mail válido!").bail(),
    check('rg')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail()
        .isLength({min: 9, max: 9}).withMessage("Digite um RG válido!"),
    check('data_nasc')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),
    check('tel')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail()        
];