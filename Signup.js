const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(bodyParser.json());

// In-memory "database" (replace with real database in production)
const users = [];

// Sign-up endpoint
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ error: 'User already exists' });
  }

  // In a real app, you would hash the password before storing
  const newUser = { email, password };
  users.push(newUser);

  // Return success response
  res.status(201).json({ message: 'User registered successfully', user: { email } });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});