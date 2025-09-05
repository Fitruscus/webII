import cards from './cards.js';
const tabla = (() => {
    // Se busca la tabla y de esta se obtiene el tbody donde se ingresarán los datos
    const cuerpoTabla = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    
    const addTask = (task) => {
        //Se crea una nueva fila y se ingresan los datos obtenidos en el formulario
        const nuevaFila = cuerpoTabla.insertRow();
        nuevaFila.insertCell(0).textContent = task.task;
        nuevaFila.insertCell(1).textContent = task.description;
        nuevaFila.insertCell(2).textContent = task.date;
        nuevaFila.insertCell(3).textContent = task.priority;

        // Acciones
        const accionCell = nuevaFila.insertCell(4);
        const acciones = document.createElement('div');
        acciones.className = 'actions';

        // Crear botón de completar
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.className = 'view';
        completeButton.addEventListener('click', () => {
            nuevaFila.classList.toggle('completed');
            ///// Función importada de cards.js
            cards.update();
        });
        acciones.appendChild(completeButton);

        // Crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            cuerpoTabla.deleteRow(nuevaFila.rowIndex-1);
            ///// Función importada de cards.js
            cards.update();
        });
        acciones.appendChild(deleteButton);
        accionCell.appendChild(acciones);
    };

    // Recupero elementos (texto) de la tabla
    const getTask = () => {
        return Array.from(cuerpoTabla.rows).map(row => ({
            task : row.cells[0].textContent,
            description : row.cells[1].textContent,
            date : row.cells[2].textContent,
            priority : row.cells[3].textContent,
            completed : row.classList.contains('completed')
        }));
    };
    return {
        addTask,
        getTask
    }
})();
export default tabla;