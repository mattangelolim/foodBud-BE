// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const celebrant = sequelize.define("celebrant", {
  celebrant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celebrant_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celebrant_age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celebrant_gender: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// celebrant.sync();

module.exports = celebrant;
