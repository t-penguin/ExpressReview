const { DataTypes } = require("sequelize");
const db = require("./db");

// TASK 1: Define the Task model here
const Task = db.define("task", {
  // You should define the following columns:
  title: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Task;
