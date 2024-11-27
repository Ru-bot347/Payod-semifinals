const tasks = require("../models/taskModel.js"); // Assuming the path is correct

const getAllTasks = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Tasks retrieved successfully", data: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = Number(req.params.id); // Ensure it's converted to a number
    if (isNaN(id)) {
      // Validate ID is a valid number
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = tasks.find((task) => task.id === id);

    if (task) {
      return res
        .status(200)
        .json({ message: "Task retrieved successfully", data: task });
    } else {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


// Add a new task
const addTask = async (req, res) => {
  try {
    const newTask = req.body;
    tasks.push(newTask); // Modify the tasks data (assuming it's mutable)
    res.status(201).json({ message: "Task added successfully", data: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...req.body }; // Update the task at the index
      res
        .status(200)
        .json({ message: "Task updated successfully", data: tasks });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Delete an item
const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1); // Remove the task at the index
      res
        .status(200)
        .json({ message: "Task deleted successfully", data: tasks });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};