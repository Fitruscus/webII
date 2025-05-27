import { peliculaService } from "../../service/pelicula-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nombre_pelicula = document.querySelector("[data-nombre-pelicula]").value.trim();
    const duracion_pelicula = document.querySelector("[data-duracion-pelicula]").value.trim();

    // Verificar si la película ya existe
    peliculaService.buscarPeliculaPorNombre(nombre_pelicula)
        .then(peliculaExistente => {
            if (peliculaExistente) {
                throw new Error("El nombre de película ya está registrado");
            }
            return peliculaService.crearPelicula(nombre_pelicula, duracion_pelicula);
        })
        .then(() => {
            alert("Película registrada con éxito");
            window.location.href = "../screens/peliculas.html";
        })
        .catch(error => {
            console.error("Error al registrar:", error);
            alert("Error al registrar película: " + error.message);
        });
});