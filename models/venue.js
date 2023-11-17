// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const venue = sequelize.define("venue", {
  venue_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
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
  },
  venue_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue_pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },   
});

venue.sync();

module.exports = venue;
