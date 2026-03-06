const express = require('express');
const { generateImpactReport, getImpactHistory } = require('../modules/impact/impact.service');

const router = express.Router();

router.post('/generate', async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Products array is required'
      });
    }

    const impactReport = await generateImpactReport(products);

    res.status(200).json({
      success: true,
      data: impactReport
    });
  } catch (error) {
    next(error);
  }
});

router.get('/history', async (req, res, next) => {
  try {
    const history = await getImpactHistory();

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
