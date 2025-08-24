// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la base de datos de MongoDB.');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;