module.exports = (sequelize, DataTypes) => {

    const ProdutoHasPedido = sequelize.define("ProdutoHasPedido", {

        pedidos_id: DataTypes.INTEGER,
        produtos_id: DataTypes.INTEGER,
        qt_produto: DataTypes.INTEGER,
        preco_produto: DataTypes.FLOAT,        
    },
    {
        tableName: 'produtos_has_pedidos', //informações da identificação da tabela  do banco de dados
        timestamps: false
    });   

    return ProdutoHasPedido;
}