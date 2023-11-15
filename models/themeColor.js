// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const theme_color = sequelize.define("theme_color", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  color_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  color_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// theme_color.sync();
module.exports = theme_color;