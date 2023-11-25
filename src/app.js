import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

  jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
    res.json({ token });
  });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
