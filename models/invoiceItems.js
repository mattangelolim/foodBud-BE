const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const invoice_items = sequelize.define("invoice_items", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    invitems_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  // invoice_items.sync()
  
  module.exports = invoice_items;