// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const order = sequelize.define("order", {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// order.sync();

module.exports = order;
