import axios from "axios";
import OpenAI from "openai";

const groqai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const fetchCryptoNews = async (coin) => {
  try {
    const { data } = await axios.get(
      "https://cryptopanic.com/api/developer/v2/posts/",
      {
        params: {
          auth_token: process.env.CRYPTOPANIC_API_KEY,
          currencies: coin.toUpperCase(),
        },
        timeout: 10000,
      }
    );

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.slice(0, 7).map((item) => ({
      title: item.title,
      description: item.description || item.title,
      url: item.slug ? `https://cryptopanic.com/news/${item.slug}` : "#",
      published_at: item.published_at,
      kind: item.kind,
    }));
  } catch (err) {
    console.error("Full error:", err.response?.data || err);
    throw new Error("Failed to fetch crypto news");
  }
};

export const generateAIInsight = async (coin, news) => {
  try {
    if (!news.length) {
      return `There is currently no major news affecting ${coin}. Market movement is likely driven by technical factors.`;
    }

    const text = news
      .map(
        (n, i) =>
          `${i + 1}. ${n.title}${n.description ? ` - ${n.description}` : ""}`
      )
      .join("\n");

    const prompt = `
Analyze the following crypto news about ${coin}.
Return a short, beginner-friendly market insight (1–2 sentences).

Recent News:
${text}
`;

    // Changed from openai to groqai
    const response = await groqai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Changed to Groq model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error message:", err.message);
    throw new Error(`Groq AI Error: ${err.message || "Unknown error"}`);
  }
};
