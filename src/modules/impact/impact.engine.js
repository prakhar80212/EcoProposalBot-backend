function calculateImpact(products) {
  let plasticSaved = 0;
  let carbonAvoided = 0;
  let localScore = 0;
  let localProducts = [];

  const plasticFactors = {
    Bamboo: 30,
    Recycled: 25,
    Compostable: 40,
    Organic: 20,
    Seed: 35
  };

  const carbonFactor = 50;

  products.forEach(product => {
    const quantity = product.quantity;
    const name = product.name;

    Object.keys(plasticFactors).forEach(key => {
      if (name.includes(key)) {
        plasticSaved += plasticFactors[key] * quantity;
        carbonAvoided += carbonFactor * quantity;
        localScore += 10;
        localProducts.push(name);
      }
    });
  });

  const localSourcingSummary = localScore > 0 
    ? `${localProducts.length} eco-friendly products supporting sustainable practices`
    : 'No local sourcing impact detected';

  return {
    plastic_saved_grams: plasticSaved,
    carbon_avoided_grams: carbonAvoided,
    local_sourcing_score: localScore,
    local_sourcing_summary: localSourcingSummary
  };
}

module.exports = { calculateImpact };