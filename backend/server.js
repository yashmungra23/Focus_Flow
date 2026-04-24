require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

/* ENV CHECK */
if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL missing in .env");
  process.exit(1);
}

/* MONGODB CONNECTION */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ DB Error:", err);
    process.exit(1);
  });


/*  SCHEMAS */

// TASK
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: String,
  deadline: String,
  estMins: Number,
  notes: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

// SESSION
const sessionSchema = new mongoose.Schema({
  date: String,
  duration: Number,
  mode: String,
  taskId: String,
  interrupts: Array,
  score: Number
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);


/*  TASK ROUTES */

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// ADD task
app.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// TOGGLE complete
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


/*  SESSION ROUTES */

// GET sessions
app.get("/api/sessions", async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// ADD session
app.post("/api/sessions", async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to save session" });
  }
});


/* 🤖 AI ROUTE */

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

app.post("/api/ai", async (req, res) => {
  try {
    const { messages, system } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: system || "You are a helpful assistant." },
        ...(messages || [])
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).json({ reply: "AI error" });
  }
});


/* START SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

//for backend running
app.get("/", (req, res) => {
  res.send("FocusFlow backend is running 🚀");
});
const cors = require("cors");

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://focusflow-frontend-xyz.onrender.com"
  ]
}));

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ ADD HERE
app.use(cors());

// other middleware
app.use(express.json());

// your existing routes
app.use("/api/tasks", require("./routes/tasks"));  // example
app.use("/api/sessions", require("./routes/sessions")); // if exists

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});