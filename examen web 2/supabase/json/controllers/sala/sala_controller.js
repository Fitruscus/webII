import { salaService } from "../../service/sala-service.js";

const crearFilaSala = ({ nombre_sala, asientos_sala }) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombre_sala}</td>
        <td>${asientos_sala}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_sala.html?nombre_sala=${nombre_sala}" 
                       class="simple-button simple-button--edit">Ver Info</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" 
                            type="button" data-nombre-sala="${nombre_sala}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    
    const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", async () => {
        const nombre_sala = btnEliminar.getAttribute('data-nombre-sala');
        try {
            // Verificar si hay asignaciones relacionadas
            const tieneAsignaciones = await salaService.verificarAsignacionesSala(nombre_sala);
            
            if (tieneAsignaciones) {
                alert("No se puede eliminar esta sala porque está siendo usada en asignaciones activas");
                return;
            }
            
            // Confirmación final
            if (confirm(`¿Estás seguro de eliminar la sala "${nombre_sala}"?\n\nEsta acción no se puede deshacer.`)) {
                await salaService.eliminarSala(nombre_sala);
                alert("Sala eliminada con éxito");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al verificar o eliminar la sala: " + error.message);
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

// Carga inicial directa
salaService.listarSalas()
    .then(salas => {
        salas.forEach(sala => {
            table.appendChild(crearFilaSala(sala));
        });
    })
    .catch(error => {
        console.error("Error al cargar salas:", error);
        alert("Ocurrió un error al cargar las salas");
    });