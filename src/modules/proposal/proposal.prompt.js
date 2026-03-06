function buildProposalPrompt({
  budget,
  client_type,
  event_type,
  priority,
  products
}) {
  return `
You are a backend AI system.

You are NOT a chatbot.
You do NOT ask questions.
You do NOT explain anything.
You ONLY return strict JSON.

If you return anything other than valid JSON, the system will fail.

---

TASK:
Generate a sustainable B2B product proposal.

CONSTRAINTS:
- Maximum total budget: ${budget}
- Use ONLY products provided
- Do NOT invent products
- Do NOT add text outside JSON
- No markdown
- No explanation
- Output must be valid JSON

Client Type: ${client_type}
Event Type: ${event_type}
Priority: ${priority}

AVAILABLE PRODUCTS:
${JSON.stringify(products, null, 2)}

---

REQUIRED OUTPUT FORMAT:

{
  "recommended_products": [
    {
      "product_id": "string",
      "name": "string",
      "quantity": number,
      "unit_cost": number,
      "total_cost": number
    }
  ],
  "impact_positioning": "string"
}

Remember:
Return ONLY valid JSON.
`;
}

module.exports = { buildProposalPrompt };