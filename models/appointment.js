// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const appointment = sequelize.define("appointment", {
  appt_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  reservation_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appt_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appt_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  appt_status: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// appoointment.sync();

module.exports = appointment;
