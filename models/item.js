const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const item = sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dish_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//item.sync();

module.exports = item;
