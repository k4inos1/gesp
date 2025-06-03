const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://zerveck:n74SNV0Gm5i226yc@clustserverkainos.uhwrs.mongodb.net/gesapp';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;