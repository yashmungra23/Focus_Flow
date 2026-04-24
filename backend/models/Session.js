const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        date: String,
        duration: Number,
        mode: String,
        taskId: String,
        interrupts: Array,
        score: Number
    });

module.exports = mongoose.model("Session", sessionSchema);