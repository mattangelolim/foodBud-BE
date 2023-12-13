// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const event_type = sequelize.define("event_type", {
  event_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  event_type_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// event_type.sync();

module.exports = event_type;
