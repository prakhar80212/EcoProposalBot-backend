const express = require("express");
const router = express.Router();

const { db } = require("../config/firebase");
const { callGemini } = require("../services/gemini.service");
const { buildProposalPrompt } = require("../modules/proposal/proposal.prompt");
const { buildCategoryPrompt } = require("../modules/category/category.prompt");

/* --------------------------
   Firebase Test Route
--------------------------- */
router.get("/test", async (req, res) => {
  try {
    const testDoc = await db.collection("test").add({
      message: "Firebase connected",
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: "Firebase working",
      docId: testDoc.id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


/* --------------------------
   Gemini Test Route
--------------------------- */
router.get("/ai-test", async (req, res) => {
  try {
    const response = await callGemini(
      'Return strictly this JSON: {"message":"Gemini working"}'
    );

    // Try parsing JSON safely
    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch {
      parsed = { raw: response };
    }

    res.json({
      success: true,
      data: parsed
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


/* --------------------------
   Generate Proposal Route
--------------------------- */
/* --------------------------
   Generate Proposal Route
--------------------------- */
router.post("/generate", async (req, res) => {
  try {
    const { budget, client_type, event_type, priority } = req.body;

    if (!budget || !client_type || !event_type || !priority) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Fetch products
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({
      product_id: doc.id,
      ...doc.data()
    }));

    if (products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products found in database"
      });
    }

    // Build prompt
    const prompt = buildProposalPrompt({
      budget,
      client_type,
      event_type,
      priority,
      products
    });

    const rawResponse = await callGemini(prompt);

    // Parse AI response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI did not return valid JSON",
        raw: rawResponse
      });
    }

    // Budget validation
    const totalAllocated = parsedResponse.recommended_products.reduce(
      (sum, item) => sum + item.total_cost,
      0
    );

    if (totalAllocated > budget) {
      return res.status(400).json({
        success: false,
        message: "AI exceeded budget limit"
      });
    }

    // Add server-side budget summary
    parsedResponse.budget_summary = {
      total_budget: budget,
      allocated: totalAllocated,
      remaining: budget - totalAllocated
    };

    // Save proposal to Firestore
    const savedProposal = await db.collection("proposals").add({
      client_type,
      event_type,
      priority,
      budget,
      recommended_products: parsedResponse.recommended_products,
      impact_positioning: parsedResponse.impact_positioning,
      budget_summary: parsedResponse.budget_summary,
      createdAt: new Date()
    });

    // Final response
    return res.status(200).json({
      success: true,
      proposalId: savedProposal.id,
      data: parsedResponse
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    const snapshot = await db
      .collection("proposals")
      .orderBy("createdAt", "desc")
      .get();

    const proposals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      data: proposals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post("/categorize", async (req, res) => {
  try {
    const productData = req.body;

    const prompt = buildCategoryPrompt(productData);
    const rawResponse = await callGemini(prompt);

    let cleanedResponse = rawResponse.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedResponse);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "AI did not return valid JSON",
        raw: rawResponse
      });
    }

    const savedCategory = await db.collection("product_categories").add({
      input: {
        name: productData.name,
        description: productData.description,
        material: productData.material,
        price: productData.price,
        size: productData.size
      },
      output: {
        primary_category: parsedResponse.primary_category,
        sub_category: parsedResponse.sub_category,
        seo_tags: parsedResponse.seo_tags,
        sustainability_filters: parsedResponse.sustainability_filters
      },
      createdAt: new Date()
    });

    res.status(200).json({
      success: true,
      categoryId: savedCategory.id,
      data: parsedResponse
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get("/categorize/history", async (req, res) => {
  try {
    const snapshot = await db
      .collection("product_categories")
      .orderBy("createdAt", "desc")
      .get();

    const history = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json({
      success: true,
      data: history
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;