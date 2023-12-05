const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const employee = sequelize.define("employee", {
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  emp_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_contactnum: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emp_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// employee.sync();

module.exports = employee;
