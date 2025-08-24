// controllers/taskController.js
const Tarea = require('../models/Tarea');

// Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ createdAt: -1 });
    res.status(200).json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const nuevaTarea = await Tarea.create(req.body);
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    res.status(200).json(tarea);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    res.status(200).json({ message: 'Tarea eliminada con éxito.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};