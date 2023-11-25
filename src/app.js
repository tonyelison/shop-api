import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
