app.post("/api/ai", async (req, res) => {
  try {
    const { messages, system } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",  // ✅ updated model
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