const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('pedido', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkCliente : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        },
        dtEmissao: {
            type : Sequelize.DATEONLY,
            allowNull : false
        },
        dtEntrega: {
            type : Sequelize.DATEONLY,
            allowNull : false
        },
        fkEndereco:{
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull:false
        },
        total:{
            type : Sequelize.DECIMAL(10,2),
            allowNull: false
        }
            
        
    })
}