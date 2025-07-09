const db = require("./db");
const Task = require("./task");
const User = require("./user");

// ONE TO MANY
// A task has ONE user-owner
Task.belongsTo(User);
User.hasMany(Task, { as: "ownedTasks" });

// MANY TO MANY
// A task may have many users assigned to them
// Users may be assigned to many tasks
User.belongsToMany(Task, { through: "assignments", as: "assignedTasks" });
Task.belongsToMany(User, { through: "assignments", as: "assignees" });

// Export everything needed
module.exports = {
  db,
  Task,
  User,
};
