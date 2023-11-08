// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const order_item = sequelize.define("order_item", {
  order_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// order_item.sync();

module.exports = order_item;
