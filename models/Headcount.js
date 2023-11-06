// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const headcount = sequelize.define("headcount", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  headcount_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  hc_kids: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hc_adults: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// headcount.sync();

module.exports = headcount;
