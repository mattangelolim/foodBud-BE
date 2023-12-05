// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const reservation = sequelize.define("reservation", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  reservation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

//reservation.sync()

module.exports = reservation;
