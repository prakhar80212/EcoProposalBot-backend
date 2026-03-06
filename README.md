# 🌱 EcoProposalBot Backend

AI-powered backend system for generating eco-friendly product proposals and environmental impact reports using Google Gemini AI.

## ✨ Features

- **AI Product Proposals**: Generate personalized eco-friendly product recommendations
- **Impact Reporting**: Calculate and track environmental impact metrics
  - Plastic saved estimation
  - Carbon footprint avoided
  - Local sourcing impact analysis
  - AI-generated human-readable impact statements
- **History Tracking**: Store and retrieve impact reports with Firebase

## 🚀 Tech Stack

- **Node.js** & **Express.js** - Backend framework
- **Firebase Firestore** - Database
- **Google Gemini AI** - AI content generation
- **Zod** - Schema validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- Firebase project with Firestore enabled
- Google Gemini API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/prakhar80212/EcoProposalBot-backend.git
cd EcoProposalBot-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Add Firebase credentials:
- Download your `serviceAccountKey.json` from Firebase Console
- Place it in the root directory

5. Start the server:
```bash
npm run dev
```

## 📡 API Endpoints

### Health Check
```http
GET /api/health
```

### Generate Product Proposal
```http
POST /api/proposal/generate
Content-Type: application/json

{
  "category": "Kitchen",
  "preferences": ["eco-friendly", "reusable"]
}
```

### Generate Impact Report
```http
POST /api/impact/generate
Content-Type: application/json

{
  "products": [
    {
      "name": "Bamboo Toothbrush",
      "quantity": 2
    },
    {
      "name": "Recycled Paper Notebook",
      "quantity": 3
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "plastic_saved_grams": 135,
    "carbon_avoided_grams": 250,
    "local_sourcing_score": 50,
    "local_sourcing_summary": "5 eco-friendly products supporting sustainable practices",
    "impact_statement": "Your order has made a real difference!...",
    "products": [...],
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Get Impact History
```http
GET /api/impact/history
```

## 🧪 Testing

Test the APIs using curl:

```bash
# Generate Impact Report
curl -X POST http://localhost:5000/api/impact/generate \
  -H "Content-Type: application/json" \
  -d '{"products":[{"name":"Bamboo Toothbrush","quantity":2}]}'

# Get History
curl http://localhost:5000/api/impact/history
```

## 📁 Project Structure

```
ai-system-backend/
├── src/
│   ├── config/
│   │   └── firebase.js
│   ├── modules/
│   │   ├── category/
│   │   ├── impact/
│   │   │   ├── impact.engine.js
│   │   │   ├── impact.prompt.js
│   │   │   └── impact.service.js
│   │   └── proposal/
│   ├── routes/
│   │   ├── impact.routes.js
│   │   └── proposal.routes.js
│   ├── services/
│   │   └── gemini.service.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🌍 Environmental Impact Calculation

The system calculates impact based on:

- **Plastic Factors**: Bamboo (30g), Recycled (25g), Compostable (40g), Organic (20g), Seed (35g)
- **Carbon Factor**: 50g per eco-friendly product
- **Local Sourcing Score**: 10 points per sustainable product

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 👤 Author

Prakhar - [GitHub](https://github.com/prakhar80212)

## 🙏 Acknowledgments

- Google Gemini AI for content generation
- Firebase for database services
