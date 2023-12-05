const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const miscellaneous = sequelize.define("miscellaneous", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fee_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
    },
    fee_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fee_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  //miscellaneous.sync()
  
  module.exports = miscellaneous;