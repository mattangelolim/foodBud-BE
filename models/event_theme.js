// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const event_theme = sequelize.define("event_theme", {
  theme_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  theme_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// event_theme.sync();

module.exports = event_theme;
