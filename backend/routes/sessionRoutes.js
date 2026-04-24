const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// GET sessions
router.get("/", async (req, res) => {
    const sessions = await Session.find();
    res.json(sessions);
});

// SAVE session
router.post("/", async (req, res) => {
    const session = new Session(req.body);
    await session.save();
    res.json(session);
});

module.exports = router;