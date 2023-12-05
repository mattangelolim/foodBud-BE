const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const coverageLink = sequelize.define("coverageLink", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    event_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    coverage_type:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    coverage_link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  });
  
//    coverageLink.sync();
  
  module.exports = coverageLink; 