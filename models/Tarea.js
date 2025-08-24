// models/Tarea.js
const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la tarea es obligatorio.'],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  completada: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tarea', TareaSchema);