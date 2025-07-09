const db = require("./db");
const { Task, User } = require("./index");

const seed = async () => {
  db.logging = false;
  await db.sync({ force: true }); // Drop and recreate tables
  const users = await User.bulkCreate([
    { name: "Finn" },
    { name: "AJ" },
    { name: "Shahid" },
  ]);

  console.log(`👥 Created ${users.length} users`);

  const tasks = await Task.bulkCreate([
    {
      title: "Get eight hours of sleep",
      description: "Sleepy time tea is a must",
      completed: false,
    },
    {
      title: "EOD survey",
      description: "The EOD survey is always linked in the Discord",
      completed: true,
    },
    {
      title: "Install PostgreSQL",
      description: "Don't forget your PostgreSQL password!",
      completed: true,
    },
  ]);

  await tasks[0].setUser(users[0]);
  await tasks[1].setUser(users[1]);
  await tasks[2].setUser(users[2]);

  await tasks[0].addAssignee(users[1]);
  await tasks[0].addAssignee(users[2]);
  await tasks[1].addAssignee(users[0]);
  await tasks[2].addAssignee(users[0]);

  console.log(`📝 Created ${tasks.length} tasks`);

  console.log(`☑️ Created 3 task assignments`);

  console.log("🌱 Seeded the database");
  db.close();
};

seed();
