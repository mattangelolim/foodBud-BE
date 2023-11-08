// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const venue = sequelize.define("venue", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  venue_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue_floor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue_address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  venue_pin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },   
});

// venue.sync();

module.exports = venue;
