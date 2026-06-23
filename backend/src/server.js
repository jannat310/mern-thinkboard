import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

// Absolute path design karein root folder se
const frontendBuildPath = path.resolve(__dirname, "..", "frontend", "dist");

console.log("Checking Deployment Environment...");
console.log("NODE_ENV Value:", process.env.NODE_ENV);
console.log("Frontend Build Path Resolved to:", frontendBuildPath);

// Production condition check
if (process.env.NODE_ENV === "production") {
  console.log("Serving Frontend Static Files successfully.");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  console.log("WARNING: App is NOT running in production mode fallback.");
  // Fallback root route for testing
  app.get("/", (req, res) => {
    res.send("Backend API is up, but frontend is not serving. Check NODE_ENV.");
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
