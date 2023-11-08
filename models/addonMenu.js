const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const addon_menu = sequelize.define("addon_menu", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    addons_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addons_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addons_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addons_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  // addon_menu.sync();
  
  module.exports = addon_menu;