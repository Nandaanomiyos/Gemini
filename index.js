const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Chatbot Gemini Aktif 🚀");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
