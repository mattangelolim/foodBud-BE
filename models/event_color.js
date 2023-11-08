// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const color = sequelize.define("color", {
  color_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  color_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// color.sync();

module.exports = color;
