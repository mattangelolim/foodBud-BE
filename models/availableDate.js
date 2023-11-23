const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AvailableDate = sequelize.define("AvailableDate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

// AvailableDate.sync();

module.exports = AvailableDate;
