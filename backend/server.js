// Import necessary packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Create an Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => {
    console.log(err);
  });

// API routes
const wordRouter = require("./routes/api");
app.use("/api/words", wordRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
