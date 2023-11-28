// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const payment = sequelize.define("payment", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    event_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_availed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    payment_paid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    payment_receipt: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
});

payment.sync();

module.exports = payment;
