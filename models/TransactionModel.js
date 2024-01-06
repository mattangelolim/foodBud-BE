const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TransactionModel = sequelize.define('TransactionModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Receipt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
    }
})

TransactionModel.sync()

module.exports = TransactionModel;