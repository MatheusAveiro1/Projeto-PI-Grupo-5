module.exports = (sequelize, DataTypes) => {

    const Usuario = sequelize.define("Usuario", {

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
    )

    return Usuario
}