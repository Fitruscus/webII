import { asignacionService } from "../../service/asignacion-service.js";

const crearFilaAsignacion = (asignacion) => {
    // Función para formatear fecha sin problemas de zona horaria
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${asignacion.nombre_sala}</td>
        <td>${asignacion.nombre_pelicula}</td>
        <td>${formatDate(asignacion.fecha)}</td>
        <td>${asignacion.horario_entrada_pelicula}</td>
        <td>${asignacion.boletos_disponibles}</td>
        <td>
            <button class="simple-button simple-button--delete" 
                    type="button" 
                    data-nombre-sala="${asignacion.nombre_sala}"
                    data-nombre-pelicula="${asignacion.nombre_pelicula}"
                    data-fecha="${asignacion.fecha}"
                    data-horario="${asignacion.horario_entrada_pelicula}">
                Eliminar
            </button>
        </td>
    `;
    
    const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", async () => {
        const nombre_sala = btnEliminar.getAttribute('data-nombre-sala');
        const nombre_pelicula = btnEliminar.getAttribute('data-nombre-pelicula');
        const fecha = btnEliminar.getAttribute('data-fecha');
        const horario = btnEliminar.getAttribute('data-horario');

        try {
            const tieneBoletos = await asignacionService.verificarBoletosAsignacion(
                nombre_sala,
                nombre_pelicula,
                fecha,
                horario
            );

            if (tieneBoletos) {
                alert("No se puede eliminar esta asignación porque ya hay boletos vendidos");
                return;
            }

            if (confirm("¿Estás seguro de eliminar esta asignación, NO DEBE HABER BOLETOS VENDIDOS?")) {
                await asignacionService.eliminarAsignacion(
                    nombre_sala,
                    nombre_pelicula,
                    fecha,
                    horario
                );
                alert("Asignación eliminada con éxito");
                window.location.reload();
            }

        } catch (error) {
            alert("Error: " + error.message);
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

// Carga inicial directa
asignacionService.listarAsignaciones()
    .then(asignaciones => {
        asignaciones.forEach(asignacion => {
            table.appendChild(crearFilaAsignacion(asignacion));
        });
    })
    .catch(error => {
        console.error("Error al cargar asignaciones:", error);
        alert("Ocurrió un error al cargar las asignaciones");
    });