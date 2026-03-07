import aichat from "../model/aichat";
import { buildSystemPrompt } from "../services/marketservice";
import OpenAI from "openai";

const groqai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const activeSession = {};

// chat endpoint with ai
export const createChat = async (req, res) => {
  try {
    const userId = req.user.id;

    const { sessionId, message, coinContext } = req.body;

    if (!sessionId || !message) {
      res
        .status(400)
        .json({ success: false, message: "No message or session Id" });
    }

    // Create session history
    if (!activeSession[sessionId]) {
      activeSession[sessionId] = [];
    }

    const sessionMessage = activeSession[sessionId];
    // add user message to the session

    sessionMessage.push({ role: "user", content: message });

    // build system prompt

    const systemPromt = await buildSystemPrompt(coinContext || null);

    // call Groq ai

    const response = await groqai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPromt }, ...sessionMessage],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiReply = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      reply: aiReply,
      sessionId,
    });
    sessionMessage.push({ role: "system", content: aiReply });
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};

// save chat summary
export const saveChatSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.body;

    if (sessionId) {
      res.status(400).json({ success: false, message: "No session created" });
    }
    // create session history
    if (!activeSession[sessionId]) {
      activeSession[sessionId] = [];
    }

    const sessionMessage = activeSession[sessionId];

    if (!sessionMessage || sessionMessage.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "No active session found" });
    }

    // ai summary

    const createSummary = await groqai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      message: [
        {
          role: "system",
          content:
            "Summarize the following conversation in maximum 20 words. Return only the summary, nothing else.",
        },
        {
          role: "user",
          content: sessionMessage.map((m) => `${m.role} ${m.content}`),
        },
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    const summary = createSummary.choices[0].message.content.trim();

    await aichat.create({ userId, sessionId, summaryMessage: summary });

    delete activeSession[sessionId];
    res.status(200).json({
      success: true,
      message: "Summary saved",
      summary,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get chat histotry

export const chatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const getHistory = await aichat
      .find({ userId })
      .sort({ createdAt: -1 })
      .select("sessionId summaryMessage createdAt");

    if (getHistory.length === 0) {
      res.status(404).json({ succes: false, message: "No chat history" });
    }

    res.status(200).json({
      success: true,
      message: "Fetched chat history success",
      getHistory,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
