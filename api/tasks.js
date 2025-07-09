const express = require("express");
const router = express.Router();
const { Task } = require("../database");

// TASK 4: Add the necessary routes here
// This time, use your newly created Sequelize models instead of the dummy database

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET a single task by id
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// GET all users assigned to a task by id
router.get("/:id/assigned-users", async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const task = await Task.findAll({
      where: { id: taskId },
      include: "assignees",
    });
    const assignees = task[0].dataValues.assignees;
    res.status(200).send(assignees);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Patch a task by id
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    const updatedTask = await task.update(req.body);
    res.send(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task by id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});
module.exports = router;

// TASK 5: Create a new routes file for users, and add as many routes as you see fit
// Don't forget to export the router, and import it into api/index.js
