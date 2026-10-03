import express from 'express';
import testRoutes from "./routes/testRoutes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/testRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Patronus');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Patronus Server is running on port ${PORT} `);
});
