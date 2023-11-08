const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const addons = sequelize.define("addons", {
    addons_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
  
//   addons.sync();
  
  module.exports = addons;