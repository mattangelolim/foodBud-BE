// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const id = sequelize.define("id", {
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
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

// id.sync();
module.exports = id;
