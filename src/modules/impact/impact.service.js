const { calculateImpact } = require('./impact.engine');
const { generateImpactPrompt } = require('./impact.prompt');
const { callGemini } = require('../../services/gemini.service');
const { db } = require('../../config/firebase');
const admin = require('firebase-admin');

async function generateImpactReport(products) {
  const impactData = calculateImpact(products);
  
  const prompt = generateImpactPrompt(impactData, products);
  const impactStatement = await callGemini(prompt);

  const report = {
    plastic_saved_grams: impactData.plastic_saved_grams,
    carbon_avoided_grams: impactData.carbon_avoided_grams,
    local_sourcing_score: impactData.local_sourcing_score,
    local_sourcing_summary: impactData.local_sourcing_summary,
    impact_statement: impactStatement,
    products,
    created_at: admin.firestore.FieldValue.serverTimestamp()
  };

  const docRef = await db.collection('impact_reports').add(report);
  
  return { id: docRef.id, ...report };
}

async function getImpactHistory() {
  const snapshot = await db.collection('impact_reports')
    .orderBy('created_at', 'desc')
    .get();
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

module.exports = { generateImpactReport, getImpactHistory };
