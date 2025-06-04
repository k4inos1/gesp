const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ La variable de entorno MONGODB_URI no está definida');
  process.exit(1);
}

// Opciones de conexión mejoradas
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Aumentar el tiempo de espera a 10 segundos
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  family: 4, // Usar IPv4, omitir IPv6
  maxPoolSize: 10,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
};

const connectDB = async () => {
  try {
    console.log('🔌 Intentando conectar a MongoDB...');
    console.log('📡 URI de conexión:', MONGODB_URI.replace(/:([^:@/]+)@/, ':*****@'));
    
    const conn = await mongoose.connect(MONGODB_URI, mongooseOptions);
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
    console.log(`🔄 Estado de la conexión: ${mongoose.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
    
    return conn;
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error);
    console.error('🔍 Detalles del error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
      reason: error.reason ? {
        servers: Array.from(error.reason.servers?.values() || []).map(s => s.host)
      } : null
    });
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose conectado a la base de datos');});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ Mongoose desconectado');
});

// Cerrar la conexión cuando la aplicación se cierre
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose desconectado por terminación de la aplicación');
  process.exit(0);
});

module.exports = connectDB;