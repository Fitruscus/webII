import { peliculaService } from "../../service/pelicula-service.js";

const formulario = document.querySelector("[data-form]");
const inputDuracion = document.querySelector("[data-duracion-pelicula]");

const obtenerInfoPelicula = async () => {
    const url = new URL(window.location);
    const nombre_pelicula = url.searchParams.get("nombre_pelicula");
    const botonEditar = document.querySelector("[data-editar]");

    if (!nombre_pelicula) {
        alert("No se encontró el nombre de la película");
        window.location.href = "../screens/peliculas.html";
        return;
    }

    try {
        const [pelicula, tieneAsignaciones] = await Promise.all([
            peliculaService.buscarPeliculaPorNombre(nombre_pelicula),
            peliculaService.verificarAsignacionesPelicula(nombre_pelicula)
        ]);

        if (!pelicula) {
            throw new Error("Película no encontrada");
        }

        document.querySelector("[data-nombre-pelicula]").value = pelicula.nombre_pelicula;
        inputDuracion.value = pelicula.duracion_pelicula;

        if (tieneAsignaciones) {
            inputDuracion.readOnly = true;
            inputDuracion.title = "No se puede editar porque la película tiene asignaciones activas";
            inputDuracion.style.cursor = "not-allowed";
            botonEditar.textContent = "Volver al inicio";
            inputDuracion.style.backgroundColor = "#f5f5f5";
        } else {
            inputDuracion.readOnly = false;
            inputDuracion.title = "";
            inputDuracion.style.cursor = "text";
            botonEditar.textContent = "Actualizar Película";
            inputDuracion.style.backgroundColor = "";
        }
    } catch (error) {
        console.error("Error al cargar película:", error);
        alert("Error al cargar datos de la película: " + error.message);
        window.location.href = "../screens/peliculas.html";
    }
};

obtenerInfoPelicula();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nombre_pelicula = document.querySelector("[data-nombre-pelicula]").value;
    const duracion_pelicula = inputDuracion.value.trim();

    try {
        const tieneAsignaciones = await peliculaService.verificarAsignacionesPelicula(nombre_pelicula);

        if (tieneAsignaciones) {
            window.location.href = "../screens/peliculas.html";
            return;
        }

        await peliculaService.actualizarPelicula(nombre_pelicula, duracion_pelicula);
        alert("Película actualizada con éxito");
        window.location.href = "../screens/peliculas.html";
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar película: " + error.message);
    }
});
