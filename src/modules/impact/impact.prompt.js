function generateImpactPrompt(impactData, products) {
  return `Generate a human-readable environmental impact statement based on the following data:

Products ordered: ${products.map(p => `${p.name} (x${p.quantity})`).join(', ')}

Impact Metrics:
- Plastic saved: ${impactData.plastic_saved_grams}g
- Carbon avoided: ${impactData.carbon_avoided_grams}g
- Local sourcing score: ${impactData.local_sourcing_score}
- Local sourcing summary: ${impactData.local_sourcing_summary}

Create a concise, inspiring 2-3 sentence statement that highlights the positive environmental impact of this order. Make it personal and encouraging.`;
}

module.exports = { generateImpactPrompt };
