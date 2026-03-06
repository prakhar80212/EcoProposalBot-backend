function buildCategoryPrompt(productData) {
  return `
You are a backend AI system for product categorization.

You ONLY return strict JSON.
No markdown, no explanation, no text outside JSON.

TASK:
Analyze the product and assign categories, tags, and sustainability filters.

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}

PREDEFINED CATEGORIES:
- Office Supplies
- Packaging
- Drinkware
- Apparel
- Tech Accessories
- Home & Living
- Outdoor & Travel
- Promotional Items

REQUIRED OUTPUT FORMAT:
{
  "primary_category": "string",
  "sub_category": "string",
  "seo_tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "sustainability_filters": ["plastic-free", "compostable", "vegan", "recycled"]
}

Return ONLY valid JSON.
`;
}

module.exports = { buildCategoryPrompt };
