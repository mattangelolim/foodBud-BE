// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const gallery = sequelize.define("gallery", {
  gallery_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  package_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  event_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  theme: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  celebrant_gender: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  celebrant_age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

gallery.sync();
module.exports = gallery;
