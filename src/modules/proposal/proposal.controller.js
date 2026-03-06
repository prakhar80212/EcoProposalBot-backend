const { generateProposal } = require("./proposal.service");

async function handleGenerateProposal(req, res, next) {
  try {
    const { budget, client_type, event_type, priority } = req.body;

    // Basic input validation
    if (!budget || !client_type || !event_type || !priority) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const result = await generateProposal({
      budget,
      client_type,
      event_type,
      priority
    });

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { handleGenerateProposal };