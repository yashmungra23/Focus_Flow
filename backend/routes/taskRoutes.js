const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// GET all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// ADD task
router.post("/", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// UPDATE task
router.put("/:id", async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// DELETE task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;