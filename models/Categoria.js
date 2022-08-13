module.exports = (sequelize, DataTypes) => {

    const categoria = sequelize.define("Categoria", {

        nome: DataTypes.STRING


    },
    {
        tableName: 'categorias',
        timestamps: false
    })

    return categoria
}