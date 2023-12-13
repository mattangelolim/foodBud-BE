// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const meeting = sequelize.define("meeting", {
  meeting_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  meeting_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meeting_notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meeting_contract: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

meeting.sync();

module.exports = meeting;
