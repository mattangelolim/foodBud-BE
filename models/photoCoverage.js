const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PhotoCoverage = sequelize.define("PhotoCoverage", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverage_type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  
  PhotoCoverage.sync()
  
  module.exports = PhotoCoverage;