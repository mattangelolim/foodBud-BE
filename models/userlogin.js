// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const userlogin = sequelize.define("userlogin", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    //unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //rename to password
  userpass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//userlogin.sync();

module.exports = userlogin;