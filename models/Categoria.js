module.exports = (sequelize, DataTypes) => {

    const Categoria = sequelize.define("Categoria", {

        nome: DataTypes.STRING,        
    },
    {
        tableName: 'categorias', //informações da identificação da tabela  do banco de dados
        timestamps: false
    });

    Categoria.associate= (models)=>{
        Categoria.hasMany(models.Produto,{
            as:'categoria_produto',
            foreignKey:'id_categoria'
        });
    }  

    return Categoria;
}