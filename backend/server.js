const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Needed for POST & PUT
let dbConnected = false;

// MongoDB Client Setup
const client = new MongoClient(process.env.MONGO_URI);
async function connectToMongo() {
  try {
    await client.connect();
    dbConnected = true;
    console.log("✅ MongoDB connected successfully");

    // Load routes after successful DB connection
    const routes = require("./routes")(client);
    app.use("/api", routes);
  } catch (err) {
    dbConnected = false;
    console.error("❌ MongoDB connection failed", err);
  }
}
connectToMongo();

app.get("/", (req, res) => {
  res.send(`Project Loading....! DB Connected: ${dbConnected}`);
});

app.listen(PORT, () => {
  console.log(`Hi, my name is Rohit Mehta. Server is running on http://localhost:${PORT}`);
});
