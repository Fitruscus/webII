import { clientService } from "../service/client-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
};

const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}"
                       class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete"
                            type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        if (confirm("¿Estás seguro de que deseas eliminar este cliente?, Se eliminaran las mascotas asociadas al dueño")) {
            clientService.eliminarCliente(id)
                .then(() => alert("Cliente eliminado"))
                .catch(error => alert("Error al eliminar"));
        } else {
            alert("Eliminación cancelada");
        }
    });

    return fila;
};

const cargarClientes = (clientes) => {
    limpiarTabla();
    clientes.forEach(({nombre, email, id}) => {
        const nuevaLinea = crear_nueva_fila(nombre, email, id);
        table.appendChild(nuevaLinea);
    });
};

// Función para manejar la búsqueda
const manejarBusqueda = () => {
    const campo = comboBox.value; // 'nombre' o 'email'
    const valor = buscadorInput.value.trim();
    
    clientService.buscarClientes(campo, valor)
        .then(cargarClientes)
        .catch(error => {
            console.error("Error al buscar clientes:", error);
            alert("Ocurrió un error al buscar clientes");
        });
};

buscadorInput.addEventListener('input', manejarBusqueda);
comboBox.addEventListener('change', manejarBusqueda);

clientService.listaclientes()
    .then(cargarClientes)
    .catch(error => {
        console.error("Error al cargar clientes:", error);
        alert("Ocurrió un error al cargar los clientes");
    });