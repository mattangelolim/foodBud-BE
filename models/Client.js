// models/Case.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const client = sequelize.define("client", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  client_email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// client.sync();


module.exports = client;
