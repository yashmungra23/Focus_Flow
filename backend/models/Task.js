const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    priority: String,
    deadline: String,
    estMins: Number,
    notes: String,
    completed: Boolean,
    createdAt: String
});

module.exports = mongoose.model("Task", taskSchema);