const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const online_meeting = sequelize.define("online_meeting", {
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
    type: DataTypes.STRING,
    allowNull: true,
  },
  time:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes:{
    type: DataTypes.TEXT,
    allowNull: true,
  },
  meeting_link:{
    type:DataTypes.STRING,
    allowNull:true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Up coming"
  },
});

// online_meeting.sync();

module.exports = online_meeting;
