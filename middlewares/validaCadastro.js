//Chamando express-validator
const {check} = require('express-validator');
//Chamando o Path
const path = require('path');
//Chamando o fs
const fs = require('fs');

module.exports = [
    check('nome')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),               
    check('sobrenome')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail(),        
    check('cpf')        
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isNumeric().withMessage("Esse campo só aceita números!").bail()
        .isLength({min: 11, max: 11}).withMessage("Difite um CPF válido!"),
    check('email')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isEmail().withMessage("Por favor preencha uma e-mail válido!").bail(),        
    check('senha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8, max:16}).withMessage("Sua senha deve ter no mínimo 8 e no máximo 16 caracteres!"),
    check('confirmarSenha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8, max:16}).withMessage("Sua senha deve ter no mínimo 8 e no máximo 16 caracteres!")
        // Validação personalizada
        // Validação da confirmação da senha
        .custom(async (confirmarSenha, {req}) => {
            const senha = req.body.senha        
            // Se a senha e a confirmação da senha não forem iguais
            // o login não será validado e retornará um erro
            if(senha !== confirmarSenha){
                throw new Error('As senhas digitadas não conferem!');
            }
        }),
    check('foto_de_perfil').custom((value, {req})=>{
        
        //Recuperando informações da imagem (nome, tamanho, extensão... etc)
        let file = req.file;
        
        //Criando um array com as extensões de imagens permitidas 
        let acceptedExtensions = ['.jpg','.png','.gif', '.jpeg'];

        if(file) {            
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`As extenssões permitidas são:  ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    })
];