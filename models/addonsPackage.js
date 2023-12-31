const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PackageAddons = sequelize.define("PackageAddons", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    package_type: {
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
  
  PackageAddons.sync()
  
  module.exports = PackageAddons;