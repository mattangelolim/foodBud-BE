// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const package = sequelize.define("package", {
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
  client_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  headcount_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  }
});

// package.sync()

module.exports = package;
