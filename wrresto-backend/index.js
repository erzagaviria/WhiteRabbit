const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/menu", menuRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
