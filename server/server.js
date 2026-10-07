import express from 'express';
import testRoutes from "./routes/testRoutes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api", testRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Patronus');
});

app.listen(process.env.PORT, () => {
  console.log(`Patronus Server is running on port ${process.env.PORT} `);
});
