const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Project Loading...!");
});

app.get("/ping", (req, res) => {
    res.send("Pong!");
});

app.listen(PORT, () => {
    console.log(`Hi, my name is Rohit Mehta. Server is running on http://localhost:${PORT}`);
});
