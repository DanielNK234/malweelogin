const { Sequelize } = require("sequelize");
const groupModels = require("./group-models");
const subgroupModels = require("./subgroup-model");


module.exports = (sequelize) => {
    sequelize.define('produto', {

        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING(200),
            allowNull : false
        },
        precoVenda:{
            type : Sequelize.DECIMAL(10,2),
            allowNull : false

        },
        fkGrupo: {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fksubGrupo: {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkColecao: {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
   
}