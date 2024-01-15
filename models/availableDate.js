const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AvailableDate = sequelize.define("AvailableDate", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date:{
    type:DataTypes.DATEONLY,
    allowNull:false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status:{
    type: DataTypes.SMALLINT,
    allowNull:false,
    defaultValue: 1
  }
});

// AvailableDate.sync();

module.exports = AvailableDate;
