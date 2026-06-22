import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";  
import cors from "cors";
import path from "path";


dotenv.config();



const app = express();
const PORT=process.env.PORT || 5001
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(cors({
  origin: "http://localhost:5173"
}))}

app.use(express.json()); // Middleware to parse JSON request bodies: req.body
 
app.use(rateLimiter);

// simple custom middlewareto log incoming req
// app.use((req, res, next) => {
//   console.log(`req method is ${req.method} and req url is ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
})
}
connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running now on port 5001", PORT);
})
})




//  mongodb+srv://maryam2015usama_db_user:1lrRfEzWkX92SEO0@cluster0.asdk2a2.mongodb.net/?appName=Cluster0