const express = require("express");
const { MongoClient } = require("mongodb");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let dbConnected = false;
let mysqlDB;

// MongoDB setup
const mongoClient = new MongoClient(process.env.MONGO_URI);

async function connectDatabases() {
  try {
    await mongoClient.connect();
    dbConnected = true;
    console.log("✅ MongoDB connected");

    const mongoRoutes = require("./routes")(mongoClient);
    app.use("/api", mongoRoutes);
  } catch (err) {
    dbConnected = false;
    console.error("❌ MongoDB connection failed:", err);
  }

  try {
    mysqlDB = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "R@hit1836",
      database: "campus_nooks",
    });
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
}

connectDatabases();

app.get("/", (req, res) => {
  res.send(`Server running. MongoDB connected: ${dbConnected}`);
});

// MySQL routes
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await mysqlDB.execute("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    res.status(500).send("MySQL Error");
  }
});

app.get("/api/romanticSpots/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const [rows] = await mysqlDB.execute(
      "SELECT * FROM romanticSpot WHERE created_by = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).send("MySQL Error");
  }
});

app.listen(PORT, () => {
  console.log(`👋 Server running on http://localhost:${PORT}`);
});
