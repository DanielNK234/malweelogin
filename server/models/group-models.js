const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('grupo', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descrição : {
            type : Sequelize.STRING(200),
            allowNull : false
        },
        status: {
            type : Sequelize.STRING(1),
            allowNull : false
        }
            
        
    })
}