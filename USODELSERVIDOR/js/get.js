const API_URL = 'http://localhost:3000/posts';

const getData = () => {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición GET. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('#taskTable tbody');
            tbody.innerHTML = '';

            data.forEach(post => {
                const fila = tbody.insertRow();
                fila.setAttribute('data-id', post.id);

                fila.insertCell(0).textContent = post.id;
                fila.insertCell(1).textContent = post.titulo;
                fila.insertCell(2).textContent = post.descripcion;
                fila.insertCell(3).textContent = post.fecha;
                fila.insertCell(4).textContent = post.nombre;
                fila.insertCell(5).textContent = post.valorEntero;

                const cellAcciones = fila.insertCell(6);
                const divAcciones = document.createElement('div');
                divAcciones.className = 'actions';
                const btnPut = document.createElement('button');
                btnPut.textContent = 'PUT';
                btnPut.className = 'view';
                btnPut.addEventListener('click', () => putData(post.id));
                divAcciones.appendChild(btnPut);

                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'DELETE';
                btnDelete.className = 'delete';
                btnDelete.addEventListener('click', () => deleteData(post.id));
                divAcciones.appendChild(btnDelete);

                cellAcciones.appendChild(divAcciones);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

document.addEventListener('DOMContentLoaded', getData);
