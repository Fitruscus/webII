import { clienteService } from "../../service/cliente-service.js";

const crearFilaCliente = ({ ci, nombre, apellido, telefono }) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${ci}</td>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${telefono}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?ci=${ci}" 
                       class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" 
                            type="button" data-ci="${ci}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    
    // Sustituir el evento click actual del botón eliminar con este:
    const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", async () => {
        const ci = btnEliminar.getAttribute('data-ci');
        try {
            // Verificar asignaciones relacionadas
            const tieneAsignaciones = await clienteService.verificarAsignacionesCliente(ci);
            
            if (tieneAsignaciones) {
                alert("No se puede eliminar este cliente porque tiene asignaciones activas");
                return;
            }

            // Confirmación final
            if (confirm(`¿Estás seguro de eliminar al cliente CI: ${ci}?\n\nEsta acción no se puede deshacer.`)) {
                await clienteService.eliminarCliente(ci);
                alert("Cliente eliminado con éxito");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al verificar o eliminar el cliente: " + error.message);
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

// Carga inicial directa (sin DOMContentLoaded)
clienteService.listarClientes()
    .then(clientes => {
        clientes.forEach(cliente => {
            table.appendChild(crearFilaCliente(cliente));
        });
    })
    .catch(error => {
        console.error("Error al cargar clientes:", error);
        alert("Ocurrió un error al cargar los clientes");
    });