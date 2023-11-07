const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const dishes_menu = sequelize.define("dishes_menu", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dish_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dish_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dish_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  dishes_menu.sync();
  
  module.exports = dishes_menu;