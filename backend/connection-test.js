// You can create this file to test connection separately
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // List all available databases
    const adminDb = conn.connection.db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Available databases:');
    dbInfo.databases.forEach(db => {
      console.log(` - ${db.name}`);
    });
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
