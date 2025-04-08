// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow your React app's origin
}));
app.use(bodyParser.json());

// In-memory "database" (for demonstration only)
const users = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Sign-up endpoint
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Check if user exists
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  // In production: Hash password with bcrypt before storing
  const newUser = { 
    id: Date.now().toString(),
    email,
    password, // NOTE: In real apps, NEVER store plain passwords
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  console.log('New user registered:', newUser.email);

  // Return response without sensitive data
  res.status(201).json({ 
    message: 'User registered successfully',
    user: { email: newUser.email, id: newUser.id }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/api/health`);
  app.get('/api/users', (req, res) => {
    res.json(users); 
  });
});