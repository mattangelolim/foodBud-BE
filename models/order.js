const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// order.sync();

module.exports = order;
