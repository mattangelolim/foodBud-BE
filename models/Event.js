// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const event = sequelize.define("event", {
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
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  celebrant_name: {
    type: DataTypes.STRING,
  },
  celebrant_age: {
    type: DataTypes.INTEGER,
  },
  event_date: {
    type: DataTypes.STRING,
  },
  prep_time: {
    type: DataTypes.STRING,
  },
  start_time: {
    type: DataTypes.STRING,
  },
  event_type: {
    type: DataTypes.STRING,
  },
  theme: {
    type: DataTypes.STRING,
  },
  color_theme: {
    type: DataTypes.STRING,
  },
  venue_time: {
    type: DataTypes.STRING,
  },
  venue_type: {
    type: DataTypes.STRING,
  },
  venue_floor: {
    type: DataTypes.STRING,
  },
  venue_address: {
    type: DataTypes.STRING,
  },
  venue_location: {
    type: DataTypes.STRING,
  },
  dish_1: {
    type: DataTypes.STRING,
  },
  dish_2: {
    type: DataTypes.STRING,
  },
  pasta: {
    type: DataTypes.STRING,
  },
  dessert: {
    type: DataTypes.STRING,
  },
});

// event.sync();

module.exports = event;
