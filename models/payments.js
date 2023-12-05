const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const payment = sequelize.define("payment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_proof: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });
  
  //payment.sync()
  
  module.exports = payment;