const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('proPedido', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkPedido : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        },
        fkProduto: {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        },
        quantidade: {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        },
        vlUnitario:{
            type : Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        description:{
            type : Sequelize.STRING(999),
            allowNull: false
        },
        acrescimo:{
            type : Sequelize.DECIMAL(10,2),
            allowNull: false
        },
        total:{
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        }
        ,
        status:{
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull:false
        },
        desconto :{
            type : Sequelize.DECIMAL(10,2),
            allowNull: false

        }

    

            
        
    })
}