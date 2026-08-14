require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

// Serve React frontend
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});