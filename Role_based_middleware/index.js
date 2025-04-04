const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());

const PORT = 9000;
const JWT_SECRET = 'your-very-secure-secret-key'; 

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10), // Hashed password
    role: 'admin'
  },
  {
    id: 2,
    username: 'editor',
    password: bcrypt.hashSync('editor123', 10),
    role: 'editor'
  },
  {
    id: 3,
    username: 'user',
    password: bcrypt.hashSync('user123', 10),
    role: 'user'
  }
];

// 1. Login Route (Generates JWT)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token (expires in 1 hour)
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// 2. JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    console.log(user);
    req.user = user; // Attach decoded user data to request
    console.log(req.user);
    next();
  });
};

// 3. Role-Based Middleware
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: `Requires ${role} role` });
    }
    next();
  };
};

// Protected Routes
app.get('/public', (req, res) => {
  res.json({ message: 'Public content - no auth needed' });
});

app.get('/user-only', authenticateJWT, (req, res) => {
  res.json({ message: `User content for ${req.user.username}` });
});

app.get('/editor-only', authenticateJWT, requireRole('editor'), (req, res) => {
  res.json({ message: `Editor dashboard for ${req.user.username}` });
});

app.get('/admin-only', authenticateJWT, requireRole('admin'), (req, res) => {
  res.json({ 
    message: `Admin panel for ${req.user.username}`,
    secretData: 'Sensitive admin-only information' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Try these endpoints:');
  console.log(`1. POST /login with { "username": "user", "password": "user123" }`);
  console.log(`2. Use the returned token in Authorization header for protected routes`);
});