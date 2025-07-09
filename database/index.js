const db = require("./db");
const Task = require("./task");
const User = require("./user");

// ONE TO MANY
// A task has ONE user-owner
User.hasMany(Task);
Task.belongsTo(User);

// MANY TO MANY
// A task may have many users assigned to them
// Users may be assigned to many tasks
User.belongsToMany(Task, { through: "assignments" });
Task.belongsToMany(User, { through: "assignments" });

// Export everything needed
module.exports = {
  db,
  Task,
  User,
};
