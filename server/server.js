import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Patronus');
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Patronus API is working"
    });
});

app.listen(3000, () => {
  console.log('Patronus Server is running on port 3000');
});
