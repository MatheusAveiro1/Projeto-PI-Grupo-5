//Chamando o multer para realizar o upload de arquivos
const multer = require('multer');
//Chamando path para o caminho dos arquivos de maneira mais fácil
const path = require("path");

//Passando o caminho onde a imagem será salva e criando o nome para ela
const storageDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folder = path.join(__dirname, '../public/images/avatares');
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        /*console.log(file);*/
        const imagemName = Date.now() + file.originalname
        cb(null,imagemName );
    }
})

//Guardando as informaçõe na variavel upload
const upload = multer({ storage: storageDiskStorage });

module.exports = upload;