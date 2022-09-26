module.exports = (sequelize, DataTypes) => {

    const Usuario = sequelize.define("Usuario",
        {
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            foto: DataTypes.STRING,
            cpf: DataTypes.STRING,
            rg: DataTypes.STRING,
            telefone: DataTypes.STRING,
            data_nascimento: DataTypes.DATE 

        },
        {
            tableName: 'usuarios', //informações da identificação da tabela  do banco de dados
            timestamps: false
        }
    );

    Usuario.associate = (models)=>{
        Usuario.hasMany(models.Pedido,{
            as:'usuario_pedido',
            foreignKey:'id_usuario'
        });

        Usuario.hasMany(models.Endereco,{
            as:'usuario_endereco',
            foreignKey:'id_usuario'
        });
    }

    return Usuario
}