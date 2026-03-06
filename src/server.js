require("dotenv").config();

const express = require("express");
const cors = require("cors");

const proposalRoutes = require("./routes/proposal.routes");
const impactRoutes = require("./routes/impact.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server running" });
});

// Routes
app.use("/api/proposal", proposalRoutes);
app.use("/api/impact", impactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});