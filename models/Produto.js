module.exports = (sequelize, DataTypes) => {

    const Produto = sequelize.define("Produto", {

        nome: DataTypes.STRING,
        modelo: DataTypes.STRING,
        descricao: DataTypes.TEXT,
        preco: DataTypes.FLOAT,
        img: DataTypes.STRING,
        id_categoria: DataTypes.INTEGER,
        id_marca: DataTypes.INTEGER
    },
    {
        tableName: 'produtos', //informações da identificação da tabela  do banco de dados
        timestamps: false
    });

    Produto.associate = (models)=>{
        Produto.belongsTo(models.Categoria,{
            as:'produto_categoria',
            foreignKey:'id_categoria'
        });

        Produto.belongsTo(models.Marca,{
            as:'produto_marca',
            foreignKey:'id_marca'
        });

        // Produto.belongsToMany(models.Pedido,{
        //     as:'produto_pedido',
        //     through:'produtos_has_pedidos',
        //     foreignKey:'produtos_id',
        //     otherKey:'pedidos_id',
        //     timestamps: false
        // })   
    } 

    return Produto;
}