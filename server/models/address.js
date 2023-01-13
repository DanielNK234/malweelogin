const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('endereco', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        logradouro : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        bairro : {
            type : Sequelize.STRING(30),
            allowNull : false
        },
        localidade : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        uf : {
            type : Sequelize.STRING(20),
            allowNull : false
        },
        cep : {
            type : Sequelize.STRING(200),
            allowNull : false
        },
        fkCliente : {
            type : Sequelize.INTEGER()
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        numero : {
            type : Sequelize.INTEGER(),
            allowNull : false
        },
        status :{
            type: Sequelize.STRING(100),
            allowNull : false
        }
})
}