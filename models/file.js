const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const file = sequelize.define("file", {
    file_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    filetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    pdf_link: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  });
  
  // file.sync();
  
  module.exports = file;