const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const event_dish = sequelize.define("event_dish", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    packdishes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  });
  
  //event_dish.sync()
  
  module.exports = event_dish;