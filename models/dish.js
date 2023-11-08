const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const dish = sequelize.define("dish", {
    dish_id: {
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
  
  // dish.sync();
  
  module.exports = dish;