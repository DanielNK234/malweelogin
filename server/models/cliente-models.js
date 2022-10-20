const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('clientes', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nomeFantasia : {
            type : Sequelize.STRING(200),
            allowNull : false
        },
        status: {
            type : Sequelize.STRING(1),
            allowNull : false
        },
        cnpj:{
            type : Sequelize.STRING(200),
            allowNull : false,
            unique: true
        },
        razãoSocial:{
            type : Sequelize.STRING(200),
            allowNull : false   
        },
        clienteDesde:{
            type:Sequelize.DATE(),
            allowNull:false

        }
    })
}