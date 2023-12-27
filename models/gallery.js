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
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celebrant_gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  celebrant_age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// gallery.sync();

module.exports = gallery;
