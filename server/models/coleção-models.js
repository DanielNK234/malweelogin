const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('colection', {

        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING(200),
            allowNull : false
        },status:{
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        }
    })

}