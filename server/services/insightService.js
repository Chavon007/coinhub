import axios from "axios";
import OpenAI from "openai";

const groqai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const fetchCryptoNews = async (coin) => {
  try {
    const params = { auth_token: process.env.CRYPTOPANIC_API_KEY };

    if (coin) {
      params.currencies = coin.toUpperCase();
    }
    const { data } = await axios.get(
      "https://cryptopanic.com/api/developer/v2/posts/",
      {
        params,
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

export const generateAIInsight = async (news, coin = null) => {
  try {
    if (!news.length) {
      return coin
        ? `There is currently no major news affecting ${coin}. Market movement is likely driven by technical factors.`
        : "There is currently no major crypto news affecting the market. Movement is likely driven by technical factors.";
    }

    const text = news
      .map(
        (n, i) =>
          `${i + 1}. ${n.title}${n.description ? ` - ${n.description}` : ""}`
      )
      .join("\n");

    const prompt = coin
      ? `
Analyze the following crypto news about ${coin}.
Return a short AI insight (1–2 sentences) for each headline in the following JSON format:

[
  { "headline": "Headline 1", "insight": "Insight 1" },
  { "headline": "Headline 2", "insight": "Insight 2" }
]

News:
${text}

`  : `
You are a crypto market analyst.

Here are recent crypto news headlines:
${text}

Please provide your output in JSON format like this:

[
  { "headline": "Headline 1", "insight": "Insight 1" },
  { "headline": "Headline 2", "insight": "Insight 2" },
  ...
]
`;

    const response = await groqai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error message:", err.message);
    throw new Error(`Groq AI Error: ${err.message || "Unknown error"}`);
  }
};
