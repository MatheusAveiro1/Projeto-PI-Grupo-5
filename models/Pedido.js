module.exports = (sequelize, DataTypes) => {

    const Pedido = sequelize.define("Pedido",
        {
            id_usuario: DataTypes.INTEGER,
            endereco: DataTypes.STRING,
            preco_total: DataTypes.FLOAT,
            transportadora: DataTypes.STRING,
            metodo_pagamento: DataTypes.STRING,
            status: DataTypes.STRING,
            datahora: DataTypes.DATE
        },
        {
            tableName: 'pedidos', //informações da identificação da tabela  do banco de dados
            timestamps: false
        }
    );

    Pedido.associate = (models)=>{
        Pedido.belongsTo(models.Usuario,{
            as:'pedido_usuario',
            foreignKey:'id_usuario'
        });

        Pedido.belongsToMany(models.Produto,{
            as:'pedido_produto',
            through:'produtos_has_pedidos',
            foreignKey:'pedidos_id',
            otherKey:'produtos_id',
            timestamps: false
        }); 
    }

    return Pedido;
}