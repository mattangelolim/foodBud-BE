const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const notification = sequelize.define("notification", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    notification_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    notif_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notif_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    netif_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  });
  
  //notification.sync()
  
  module.exports = notification;