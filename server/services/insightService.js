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
      ? `Analyze the following crypto news about ${coin}.
Return ONLY a valid JSON array with a short AI insight (1-2 sentences) for each headline.
Do not include any markdown formatting, code blocks, or extra text.

Format:
[
  { "headline": "Headline 1", "insight": "Insight 1" },
  { "headline": "Headline 2", "insight": "Insight 2" }
]

News:
${text}`
      : `You are a crypto market analyst.

Here are recent crypto news headlines:
${text}

Return ONLY a valid JSON array with insights for each headline.
Do not include any markdown formatting, code blocks, or extra text.

Format:
[
  { "headline": "Headline 1", "insight": "Insight 1" },
  { "headline": "Headline 2", "insight": "Insight 2" }
]`;

    const response = await groqai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON-only API. Return valid JSON arrays with no markdown, no code blocks, no extra text.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    });

    let insights;
    try {
      let content = response.choices[0].message.content.trim();

      content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "");

      const jsonStart = content.indexOf("[");
      const jsonEnd = content.lastIndexOf("]") + 1;

      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error("No JSON array found in response");
      }

      const jsonString = content.slice(jsonStart, jsonEnd);
      insights = JSON.parse(jsonString);

      if (!Array.isArray(insights)) {
        throw new Error("Response is not an array");
      }

      insights = insights.map((item) => ({
        headline: item.headline || "Untitled",
        insight: item.insight || "No insight available",
      }));
    } catch (err) {
      console.error("Failed to parse AI output:", err);
      console.error("Raw content:", response.choices[0].message.content);

      insights = news.slice(0, 7).map((n) => ({
        headline: n.title,
        insight:
          "Analysis temporarily unavailable. Please check the news source for details.",
      }));
    }

    return insights;
  } catch (err) {
    console.error("Error generating AI insight:", err.message);
    throw new Error(`Groq AI Error: ${err.message || "Unknown error"}`);
  }
};
