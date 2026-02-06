require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectingDB = require('./config/mongo');
const connectingcloudinary = require('./config/cloudinary');
const userRouter=require("./routes/user")
const productRouter=require("./routes/product")
const cartRouter=require("./routes/cart")
const orderRouter=require("./routes/order")

// Configure CORS to allow requests from admin and frontend domains
const allowedOrigins = process.env.FRONTEND_URL.split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

app.use(express.json());

if (typeof connectingDB === 'function') connectingDB();
if (typeof connectingcloudinary === 'function') connectingcloudinary();

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.use('/', (req, res) => {
  res.send('API is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 7777;

// Only start the server locally, not on Vercel
if (process.env.VERCEL !== "1") {
  app.listen(PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      return;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;