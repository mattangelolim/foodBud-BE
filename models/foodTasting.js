const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const foodtasting = sequelize.define("foodtasting", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  event_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull:true,
  },
  contact:{
    type:DataTypes.STRING,
    allowNull:true
  },
  address:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  google_pin:{
    type:DataTypes.STRING,
    allowNull:true
  },
  time:{
    type: DataTypes.TIME,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Up coming"
  },
});

// foodtasting.sync();

module.exports = foodtasting;
