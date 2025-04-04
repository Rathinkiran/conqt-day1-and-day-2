const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 2000;

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer Upload Middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Only images are allowed!'));
  }
});

// Serve Uploaded Files
app.use('/uploads', express.static('uploads'));

// Single File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded successfully!', file: req.file.filename });
});

// Error Handling Middleware
app.use((err, req, res, next) => res.status(400).json({ error: err.message }));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
