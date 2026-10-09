const express = require("express");
const path = require("path");
require("dotenv").config();

require("./config/db");

const todoRoutes = require("./routes/todoRoutes");

const aiRoutes = require("./routes/aiRoutes");

const app = express();


// Middleware
app.use(express.json());


// Frontend
app.use(express.static(path.join(__dirname, "../public")));


// REST API
app.use("/api/todos", todoRoutes);
app.use("/api/ai", aiRoutes);


// Frontend entry point
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../public/index.html")
    );
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});