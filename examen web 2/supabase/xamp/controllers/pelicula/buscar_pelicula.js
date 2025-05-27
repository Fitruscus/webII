import { peliculaService } from "../../service/pelicula-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    table.innerHTML = '';
};

const crearFilaPelicula = ({ nombre_pelicula, duracion_pelicula }) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombre_pelicula}</td>
        <td>${duracion_pelicula} min</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_pelicula.html?nombre_pelicula=${nombre_pelicula}" 
                       class="simple-button simple-button--edit">Ver Info</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" 
                            type="button" data-nombre-pelicula="${nombre_pelicula}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    
    const btnEliminar = fila.querySelector("button");
    btnEliminar.addEventListener("click", async () => {
        const nombre_pelicula = btnEliminar.getAttribute('data-nombre-pelicula');
        try {
            // Verificar asignaciones relacionadas
            const tieneAsignaciones = await peliculaService.verificarAsignacionesPelicula(nombre_pelicula);
            
            if (tieneAsignaciones) {
                alert("No se puede eliminar esta película porque está siendo usada en asignaciones activas");
                return;
            }

            // Confirmación final
            if (confirm(`¿Estás seguro de eliminar la película "${nombre_pelicula}"?\n\nEsta acción no se puede deshacer.`)) {
                await peliculaService.eliminarPelicula(nombre_pelicula);
                alert("Película eliminada con éxito");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al verificar o eliminar la película: " + error.message);
        }
    });

    return fila;
};

const cargarPeliculas = (peliculas) => {
    limpiarTabla();
    peliculas.forEach(pelicula => {
        table.appendChild(crearFilaPelicula(pelicula));
    });
};

const manejarBusqueda = () => {
    const campo = comboBox.value;
    const valor = buscadorInput.value.trim();
    
    peliculaService.buscarPeliculas(campo, valor)
        .then(cargarPeliculas)
        .catch(error => {
            console.error("Error al buscar películas:", error);
            alert("Ocurrió un error al buscar películas");
        });
};

// Event listeners
buscadorInput.addEventListener('input', manejarBusqueda);
comboBox.addEventListener('change', manejarBusqueda);

// Carga inicial directa
peliculaService.listarPeliculas()
    .then(cargarPeliculas)
    .catch(error => {
        console.error("Error al cargar películas:", error);
        alert("Ocurrió un error al cargar las películas");
    });