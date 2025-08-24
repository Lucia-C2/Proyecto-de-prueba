// routes/tareaRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/tareas', getTasks);
router.post('/tareas', createTask);
router.patch('/tareas/:id', updateTask);
router.delete('/tareas/:id', deleteTask);

module.exports = router;