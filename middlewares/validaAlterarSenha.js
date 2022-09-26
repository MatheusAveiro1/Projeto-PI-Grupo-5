//Chamando express-validator
const {check} = require('express-validator');

module.exports = [    
    check('senhaAtual')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8, max:16}).withMessage("Sua senha deve ter no mínimo 8 e no máximo 16 caracteres!"),
    check('novaSenha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8, max:16}).withMessage("Sua senha deve ter no mínimo 8 e no máximo 16 caracteres!"),
    check('confirmacaoNovaSenha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8, max:16}).withMessage("Sua senha deve ter no mínimo 8 e no máximo 16 caracteres!")
        // Validação personalizada
        // Validação da confirmação da senha
        .custom(async (confirmacaoNovaSenha, {req}) => {
            const senha = req.body.novaSenha        
            // Se a senha e a confirmação da senha não forem iguais
            // o login não será validado e retornará um erro
            if(senha !== confirmacaoNovaSenha){
                throw new Error('A nova senha digitada não confere!');
            }
        })
]