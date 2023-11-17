const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const dish_set = sequelize.define("dish_set", {
    set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dish_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    set_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    set_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  
  dish_set.sync()
  
  module.exports = dish_set;