const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const fb_info = sequelize.define("fb_info", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    info_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    contactnum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });
  
  //fb_info.sync();
  
  module.exports = fb_info;