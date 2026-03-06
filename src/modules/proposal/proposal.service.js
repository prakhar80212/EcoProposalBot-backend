let parsed;

try {
  const cleaned = cleanAIResponse(aiRaw);
  parsed = JSON.parse(cleaned);
} catch (error) {
  throw new Error("AI did not return valid JSON");
}