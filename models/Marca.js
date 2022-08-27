module.exports = (sequelize, DataTypes) => {

    const Marca = sequelize.define("Marca", {

        nome: DataTypes.STRING,        
    },
    {
        tableName: 'marcas', //informações da identificação da tabela  do banco de dados
        timestamps: false
    });

    Marca.associate= (models)=>{
        Marca.hasMany(models.Produto,{
            as:'marca_produto',
            foreignKey:'id_marca'
        });
    }  

    return Marca;
}