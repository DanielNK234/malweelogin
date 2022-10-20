const { Sequelize } = require("sequelize");
const groupModels = require("./group-models");
const subgroupModels = require("./subgroup-model");


module.exports = (sequelize) => {
    sequelize.define('subgrupo', {

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
        fkgrupo :{
            type:Sequelize.INTEGER,
            allowNull:false
        }
    })
   
}