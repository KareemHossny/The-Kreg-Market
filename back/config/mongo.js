const mongoose = require('mongoose');
const uri =process.env.MONGO_URI;
const connectingDB = async () => {
  try {
    mongoose.set('strictQuery', false); 
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if connection fails 
  }
};

module.exports = connectingDB;
