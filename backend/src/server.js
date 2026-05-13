import express from "express";
// const express = require("express"); // it will work when "type": "module" is not added in package or file extension should be .mjs
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:5172",
      "http://localhost:5173",
      "http://localhost:5000",
      "http://192.168.68.123:5000",
      "https://prefix-arrives-beauty-southampton.trycloudflare.com" // Removed the trailing slash
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json()); // middleware (allow me to access request.body)
app.use(rateLimiter);

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server in PORT: ${PORT}`);
  });
});
