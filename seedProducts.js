const admin = require("firebase-admin");
const path = require("path");

// Load service account
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const products = [
  {
    name: "Recycled Notebook",
    category: "Office Supplies",
    price: 120,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 50,
    carbon_saved_per_unit_kg: 0.2,
    stock: 1000
  },
  {
    name: "Bamboo Pen",
    category: "Office Supplies",
    price: 40,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 15,
    carbon_saved_per_unit_kg: 0.05,
    stock: 2000
  },
  {
    name: "Stainless Steel Water Bottle",
    category: "Corporate Gifts",
    price: 450,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 200,
    carbon_saved_per_unit_kg: 0.5,
    stock: 500
  },
  {
    name: "Organic Cotton Tote Bag",
    category: "Corporate Gifts",
    price: 180,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 100,
    carbon_saved_per_unit_kg: 0.3,
    stock: 800
  },
  {
    name: "Recycled Paper Desk Calendar",
    category: "Office Supplies",
    price: 150,
    sustainability_score: 7,
    plastic_saved_per_unit_g: 60,
    carbon_saved_per_unit_kg: 0.15,
    stock: 600
  },
  {
    name: "Bamboo Laptop Stand",
    category: "Office Supplies",
    price: 900,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 250,
    carbon_saved_per_unit_kg: 0.7,
    stock: 300
  },
  {
    name: "Eco-friendly Gift Hamper",
    category: "Corporate Gifts",
    price: 1200,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 300,
    carbon_saved_per_unit_kg: 0.9,
    stock: 200
  },
  {
    name: "Hemp Fiber Backpack",
    category: "Corporate Gifts",
    price: 1500,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 450,
    carbon_saved_per_unit_kg: 1.2,
    stock: 150
  },
  {
    name: "Solar Powered Power Bank",
    category: "Tech Accessories",
    price: 2200,
    sustainability_score: 7,
    plastic_saved_per_unit_g: 80,
    carbon_saved_per_unit_kg: 2.5,
    stock: 250
  },
  {
    name: "Wheat Straw Bluetooth Speaker",
    category: "Tech Accessories",
    price: 1100,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 120,
    carbon_saved_per_unit_kg: 0.6,
    stock: 400
  },
  {
    name: "Cork Yoga Mat",
    category: "Corporate Gifts",
    price: 1800,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 500,
    carbon_saved_per_unit_kg: 1.1,
    stock: 300
  },
  {
    name: "Recycled Plastic Stapler",
    category: "Office Supplies",
    price: 250,
    sustainability_score: 7,
    plastic_saved_per_unit_g: 150,
    carbon_saved_per_unit_kg: 0.3,
    stock: 750
  },
  {
    name: "Seed Paper Business Cards (Set of 100)",
    category: "Office Supplies",
    price: 350,
    sustainability_score: 10,
    plastic_saved_per_unit_g: 20,
    carbon_saved_per_unit_kg: 0.05,
    stock: 1200
  },
  {
    name: "Ceramic Reusable Coffee Cup",
    category: "Sustainable Breakroom",
    price: 550,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 300,
    carbon_saved_per_unit_kg: 0.4,
    stock: 900
  },
  {
    name: "Bamboo Desktop Organizer",
    category: "Office Supplies",
    price: 650,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 100,
    carbon_saved_per_unit_kg: 0.5,
    stock: 450
  },
  {
    name: "Compostable Mouse Pad",
    category: "Tech Accessories",
    price: 280,
    sustainability_score: 8,
    plastic_saved_per_unit_g: 90,
    carbon_saved_per_unit_kg: 0.2,
    stock: 1100
  },
  {
    name: "Biodegradable Phone Case",
    category: "Tech Accessories",
    price: 450,
    sustainability_score: 9,
    plastic_saved_per_unit_g: 60,
    carbon_saved_per_unit_kg: 0.15,
    stock: 650
  }
];

async function seedProducts() {
  try {
    console.log("Seeding products...");

    for (const product of products) {
      await db.collection("products").add(product);
      console.log(`Added: ${product.name}`);
    }

    console.log("Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts();