import express from 'express';
import testRoutes from "./routes/testRoutes.js";

const app = express();

app.use("/api", testRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Patronus');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Patronus Server is running on port ${PORT} `);
});
