const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const invoice = sequelize.define("invoice", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    invoice_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
    },
  });
  
  // invoice.sync()
  
  module.exports = invoice;