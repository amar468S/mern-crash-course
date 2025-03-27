import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // middleware that allows us to use json data

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port 5000 amar shinde");
});
