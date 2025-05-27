import { asignacionService } from "../../service/asignacion-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    table.innerHTML = '';
};

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

const cargarAsignaciones = (asignaciones) => {
    limpiarTabla();
    asignaciones.forEach(asignacion => {
        table.appendChild(crearFilaAsignacion(asignacion));
    });
};

const manejarBusqueda = () => {
    const campo = comboBox.value;
    const valor = buscadorInput.value.trim();
    
    asignacionService.buscarAsignaciones(campo, valor)
        .then(cargarAsignaciones)
        .catch(error => {
            console.error("Error al buscar asignaciones:", error);
            alert("Ocurrió un error al buscar asignaciones");
        });
};

// Event listeners
buscadorInput.addEventListener('input', manejarBusqueda);
comboBox.addEventListener('change', manejarBusqueda);

// Carga inicial directa
asignacionService.listarAsignaciones()
    .then(cargarAsignaciones)
    .catch(error => {
        console.error("Error al cargar asignaciones:", error);
        alert("Ocurrió un error al cargar las asignaciones");
    });

    
/* 
BOTON ELIMINAR ANTIGUO

const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", () => {
        const nombre_sala = btnEliminar.getAttribute('data-nombre-sala');
        const nombre_pelicula = btnEliminar.getAttribute('data-nombre-pelicula');
        const fecha = btnEliminar.getAttribute('data-fecha');
        const horario = btnEliminar.getAttribute('data-horario');
        
        if (confirm("¿Estás seguro de eliminar esta asignación, NO DEBE HABER BOLETOS VENDIDOS?")) {
        try {
            // Verificar si hay boletos asociados
            const tieneBoletos = asignacionService.verificarBoletosAsignacion(
                nombre_sala, 
                nombre_pelicula, 
                fecha, 
                horario
            );
            
            if (tieneBoletos) {
                throw new Error("No se puede eliminar esta asignación porque ya hay boletos vendidos");
            }
            
            // Si no hay boletos, proceder con la eliminación
            asignacionService.eliminarAsignacion(
                nombre_sala, 
                nombre_pelicula, 
                fecha, 
                horario
            );
            
            alert("Asignación eliminada con éxito");
            window.location.reload();
            } catch (error) {
                alert("Error: " + error.message);
            }
        }
    });

*/