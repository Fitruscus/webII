import tabla from "./tabla.js";

const cards = (()=>{
    const taskCards = document.getElementById('taskCards');
    const update = ()=>{
        const tasks = tabla.getTask();
        taskCards.innerHTML = ''; // limpia las cards refrescando
        
        // crear cards por tarea
        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'taskCard';

            // innerHTML = insertar cosas dentro de
            card.innerHTML = `
            <p><strong>Nombre:</strong>${task.task}</p>
            <p><strong>Descripcion:</strong>${task.description}</p>
            <p><strong>Fecha:</strong>${task.date}</p>
            <p><strong>Prioridad:</strong>${task.priority}</p>
            <p><strong>Estado:</strong>${task.completed ? 'Completada': 'Pendiente'}</p>
            `;

            taskCards.appendChild(card);
        });
    };

    return {update};
})();

export default cards;