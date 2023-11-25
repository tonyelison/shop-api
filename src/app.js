import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello, World!',
  });
});

app.post('/api/login', (req, res) => {
  // mock user data
  const user = {
    id: 1,
    username: 'tony',
    email: 'test@email.com',
  };

  jwt.sign({ user }, 'secretkey', (err, token) => {
    res.json({ token });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
