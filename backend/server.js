const express = require("express");
const { MongoClient } = require("mongodb");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); // ✅ new

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors({ origin: true, credentials: true })); // ✅ allow cookies to be sent
app.use(express.json());
app.use(cookieParser()); // ✅ middleware to read cookies

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

// Generate JWT token
function generateToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Middleware to verify token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ error: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send(`Server running. MongoDB connected: ${dbConnected}`);
});

// ✅ AUTH ENDPOINTS (JWT token-based authentication)
// Login: sets the JWT token in a cookie
app.post("/api/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const token = generateToken(username);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 3600 * 1000 // 1 hour expiration
  });

  res.json({ message: "Logged in successfully", username });
});

// Logout: clears the JWT token cookie
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Check login status (token-based)
app.get("/api/me", authenticateToken, (req, res) => {
  res.json({ loggedIn: true, username: req.user.username });
});

// ✅ MySQL routes
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
