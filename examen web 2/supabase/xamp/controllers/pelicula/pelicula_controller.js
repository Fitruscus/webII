import { peliculaService } from "../../service/pelicula-service.js";

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

const table = document.querySelector("[data-table]");

// Carga inicial directa
peliculaService.listarPeliculas()
    .then(peliculas => {
        peliculas.forEach(pelicula => {
            table.appendChild(crearFilaPelicula(pelicula));
        });
    })
    .catch(error => {
        console.error("Error al cargar películas:", error);
        alert("Ocurrió un error al cargar las películas");
    });