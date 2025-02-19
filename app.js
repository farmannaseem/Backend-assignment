const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const searchRoutes = require('./routes/search');

const app = express();

// Basic route for testing
app.get('/', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Welcome to Resume Analysis API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth/login',
      resume: '/api/resume/enrich',
      search: '/api/search'
    }
  });
});

// Then your other middleware and routes
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Add this before the connectDB function
console.log('Attempting to connect with URI:', process.env.MONGODB_URI.replace(/<password>/, '****'));

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      authSource: 'admin',
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Please check:');
    console.log('1. MongoDB Atlas IP whitelist');
    console.log('2. Database username and password');
    console.log('3. Database connection string format');
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Your API routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/search', searchRoutes);

// Add this after all your routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 