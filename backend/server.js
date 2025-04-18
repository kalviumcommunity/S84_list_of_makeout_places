const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = 3000;

let dbConnected = false;

// MongoDB Connection
const client = new MongoClient(process.env.MONGO_URI);
async function connectToMongo() {
  try {
    await client.connect();
    dbConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    dbConnected = false;
    console.error("❌ MongoDB connection failed", err);
  }
}
connectToMongo();

app.get("/", (req, res) => {
  res.send(`Project Loading....! DB Connected: ${dbConnected}`);
});

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

app.listen(PORT, () => {
  console.log(`Hi, my name is Rohit Mehta. Server is running on http://localhost:${PORT}`);
});
