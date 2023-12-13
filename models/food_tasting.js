// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const food_tasting = sequelize.define("food_tasting", {
  ft_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ft_recipient: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ft_contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ft_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ft_pinloc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

food_tasting.sync();

module.exports = food_tasting;
