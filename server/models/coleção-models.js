const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('coleção', {

        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descrição : {
            type : Sequelize.STRING(200),
            allowNull : false
        }
    })

}