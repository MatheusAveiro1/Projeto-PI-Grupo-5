const fs = require('fs');//metodo fs Manipulador de arquivos

const controlador = {
  index: (req, res)=> {
    let nomeDoArquivo = './database/produtos.json'
    let produtos = JSON.parse(fs.readFileSync(nomeDoArquivo, 'utf-8'));// conversão do json para um objeto: fs read lê o arquivo, e json.parse converte o aruivo para objeto literal

    
    res.render ('index', {produtos: produtos})


  },
  produto: (req, res)=>{
    let nomeDoArquivo = './database/produtos.json'
    let produtos = JSON.parse(fs.readFileSync(nomeDoArquivo, 'utf-8')); // conversão do json para um objeto: fs read lê o arquivo, e json.parse converte o aruivo para objeto literal
    let id = req.params.id;
    res.render('produto',{produtos: produtos , idProduto: id})
  }
}

module.exports = controlador;