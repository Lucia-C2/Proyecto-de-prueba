// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all');
    const showPendingBtn = document.getElementById('show-pending');
    const showCompletedBtn = document.getElementById('show-completed');

    let currentFilter = 'all';
    
    // Esta URL debe apuntar a tu servidor Express
    const API_URL = 'http://localhost:3000/api/tareas';

    // Cargar tareas desde el backend
    const fetchTasks = async () => {
        try {
            const res = await fetch(API_URL);
            let tasks = await res.json();
            renderTasks(tasks);
        } catch (err) {
            console.error('Error al cargar las tareas:', err);
        }
    };

    // Renderizar las tareas en el DOM
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'pending') {
                return !task.completada;
            } else if (currentFilter === 'completed') {
                return task.completada;
            }
            return true;
        });

        if (filteredTasks.length === 0 && tasks.length > 0) {
            const noTasksMessage = document.createElement('li');
            noTasksMessage.textContent = `No hay tareas ${currentFilter === 'pending' ? 'pendientes' : 'completadas'} en este momento.`;
            noTasksMessage.style.textAlign = 'center';
            noTasksMessage.style.color = '#555';
            taskList.appendChild(noTasksMessage);
        } else if (tasks.length === 0) {
            const noTasksMessage = document.createElement('li');
            noTasksMessage.textContent = "No hay tareas. ¡Agrega una nueva!";
            noTasksMessage.style.textAlign = 'center';
            noTasksMessage.style.color = '#555';
            taskList.appendChild(noTasksMessage);
        }
        
        filteredTasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            if (task.completada) {
                listItem.classList.add('completed');
            }

            const taskDetails = document.createElement('div');
            taskDetails.classList.add('task-details');

            const taskTitle = document.createElement('span');
            taskTitle.textContent = task.nombre;
            taskTitle.classList.add('task-title');
            taskDetails.appendChild(taskTitle);

            if (task.descripcion) {
                const taskDescription = document.createElement('p');
                taskDescription.textContent = task.descripcion;
                taskDescription.classList.add('task-description');
                taskDetails.appendChild(taskDescription);
            }

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completada;
            checkbox.addEventListener('change', () => toggleTaskCompleted(task._id, !task.completada));
            taskActions.appendChild(checkbox);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => {
                const newTitle = prompt("Edita el nombre de la tarea:", task.nombre);
                if (newTitle !== null && newTitle.trim() !== '') {
                    updateTask(task._id, { nombre: newTitle.trim() });
                }
            });
            taskActions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteTask(task._id));
            taskActions.appendChild(deleteButton);
            
            listItem.appendChild(taskDetails);
            listItem.appendChild(taskActions);
            taskList.appendChild(listItem);
        });
    };

    // Agregar nueva tarea
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newNombre = taskNameInput.value.trim();
        const newDescripcion = taskDescriptionInput.value.trim();
        if (newNombre !== '') {
            try {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre: newNombre, descripcion: newDescripcion })
                });
                taskNameInput.value = '';
                taskDescriptionInput.value = '';
                fetchTasks();
            } catch (err) {
                console.error('Error al agregar la tarea:', err);
            }
        }
    });

    // Actualizar el estado de una tarea
    const toggleTaskCompleted = async (id, completada) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completada })
            });
            fetchTasks();
        } catch (err) {
            console.error('Error al actualizar la tarea:', err);
        }
    };
    
    // Eliminar una tarea
    const deleteTask = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchTasks();
        } catch (err) {
            console.error('Error al eliminar la tarea:', err);
        }
    };

    // Actualizar una tarea
    const updateTask = async (id, data) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            fetchTasks();
        } catch (err) {
            console.error('Error al actualizar la tarea:', err);
        }
    };

    // Filtros
    showAllBtn.addEventListener('click', () => {
        currentFilter = 'all';
        fetchTasks();
    });

    showPendingBtn.addEventListener('click', () => {
        currentFilter = 'pending';
        fetchTasks();
    });

    showCompletedBtn.addEventListener('click', () => {
        currentFilter = 'completed';
        fetchTasks();
    });
    
    fetchTasks();
});