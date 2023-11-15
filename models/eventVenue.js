const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const event_venue = sequelize.define("event_venue", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    venue_id: {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venue_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    venue_pin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  });
  
  // event_venue.sync()
  
  module.exports = event_venue;