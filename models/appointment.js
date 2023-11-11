const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const appointment = sequelize.define("appointment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  event_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "On Going"
  },
});

// appointment.sync();

module.exports = appointment;
