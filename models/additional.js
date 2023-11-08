const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const additional = sequelize.define("additional", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    event_Id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    addons_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
  
  // additional.sync();
  
  module.exports = additional;