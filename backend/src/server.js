import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";  
import cors from "cors";

dotenv.config();



const app = express();
const PORT=process.env.PORT || 5001

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json()); // Middleware to parse JSON request bodies: req.body
 
app.use(rateLimiter);

// simple custom middlewareto log incoming req
// app.use((req, res, next) => {
//   console.log(`req method is ${req.method} and req url is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running now on port 5001", PORT);
})
})




//  mongodb+srv://maryam2015usama_db_user:1lrRfEzWkX92SEO0@cluster0.asdk2a2.mongodb.net/?appName=Cluster0