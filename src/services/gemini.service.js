const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
    temperature: 0.2,
    topP: 0.8,
    topK: 20
  }
});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;

  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw new Error("AI generation failed");
  }
}

module.exports = { callGemini };