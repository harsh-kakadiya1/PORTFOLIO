require('dotenv').config();
const express = require('express');
const cors = require('./middleware/cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors);
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/project'));
app.use('/api/ai', require('./routes/ai'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});