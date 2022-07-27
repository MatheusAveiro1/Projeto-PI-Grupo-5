const controlador = {
  index: (req, res)=> {
    res.render ('index')
  },
  produto: (req, res)=>{
    res.render('produto')
  },

  

}

module.exports = controlador;