module.exports = (sequelize, DataTypes) => {

    const Endereco = sequelize.define("Endereco", {

        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        complemento: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        estado: DataTypes.STRING,
        cep: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,
    },
    {
        tableName: 'enderecos', //informações da identificação da tabela  do banco de dados
        timestamps: false
    });

    Endereco.associate= (models)=>{
        Endereco.belongsTo(models.Usuario,{
            as:'endereco_usuario',
            foreignKey:'id_usuario'
        });
    }  

    return Endereco;
}