// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const package_rate = sequelize.define("package_rate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  package_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pax_count: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  }
});

// package_rate.sync()

module.exports = package_rate;
