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
    check('email')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isEmail().withMessage("Por favor preencha uma e-mail válido!").bail(),
    check('senha')
        .notEmpty().withMessage("Esse campo não pode ficar vazio!").bail()
        .isLength({min:8}).withMessage("Sua senha deve ter no mínimo 8 caracteres!"),
    check('foto_de_perfil').custom((value, {req})=>{
        
        //recuperando informações da imagem (nome, tamanho, extensão... etc)
        let file = req.file;
        
        // criando um array com as extensões de imagens permitidas 
        let acceptedExtensions = ['.jpg','.png','.gif'];

        if(!file) {     
            throw new Error('Precisa escolher um arquivo');            
        } else {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)) {
                //Excluir o arquivo com a extensão errada                
                fs.rm('./public/images/avatar/' + file.filename, { recursive:true }, (err) => {
                    if(err){
                        // Se a exclusão falhar
                        console.error(err.message);
                        return;
                    }

                    console.log("File deleted successfully");                    
                });

                throw new Error(`As extenssões de arquivo permitidas são:  ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];