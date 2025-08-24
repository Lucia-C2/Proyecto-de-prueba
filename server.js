// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tareaRoutes = require('./routes/tareaRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api', tareaRoutes);

app.get('/', (req, res) => {
  res.send('API de Tareas funcionando correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});