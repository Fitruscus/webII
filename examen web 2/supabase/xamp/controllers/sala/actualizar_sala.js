import { salaService } from "../../service/sala-service.js";

const formulario = document.querySelector("[data-form]");
const inputAsientos = document.querySelector("[data-asientos-sala]");

const obtenerInfoSala = async () => {
    const url = new URL(window.location);
    const nombre_sala = url.searchParams.get("nombre_sala");
    const botonEditar = document.querySelector("[data-editar]");
    
    if (!nombre_sala) {
        alert("No se encontró el nombre de la sala");
        window.location.href = "../screens/salas.html";
        return;
    }

    try {
        // Buscar la sala y verificar asignaciones en paralelo
        const [sala, tieneAsignaciones] = await Promise.all([
            salaService.buscarSalaPorNombre(nombre_sala),
            salaService.verificarAsignacionesSala(nombre_sala)
        ]);

        if (!sala) {
            throw new Error("Sala no encontrada");
        }

        document.querySelector("[data-nombre-sala]").value = sala.nombre_sala;
        inputAsientos.value = sala.asientos_sala;

        // Si tiene asignaciones, hacer el campo readonly
        if (tieneAsignaciones) {
            inputAsientos.readOnly = true;
            inputAsientos.title = "No se puede editar porque la sala tiene asignaciones activas";
            inputAsientos.style.cursor = "not-allowed";
            botonEditar.textContent = "Volver al inicio";
            inputAsientos.style.backgroundColor = "#f5f5f5";
        } else {
            inputAsientos.readOnly = false;
            inputAsientos.title = "";
            inputAsientos.style.cursor = "text";
            botonEditar.textContent = "Actualizar Sala";
            inputAsientos.style.backgroundColor = "";
        }
    } catch (error) {
        console.error("Error al cargar sala:", error);
        alert("Error al cargar datos de la sala: " + error.message);
        window.location.href = "../screens/salas.html";
    }
};

obtenerInfoSala();

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre_sala = document.querySelector("[data-nombre-sala]").value;
    const asientos_sala = inputAsientos.value.trim();

    try {
        // Verificar nuevamente por si acaso
        const tieneAsignaciones = await salaService.verificarAsignacionesSala(nombre_sala);
        
        if (tieneAsignaciones) {
            window.location.href = "../screens/salas.html";
        }

        await salaService.actualizarSala(nombre_sala, asientos_sala);
        alert("Sala actualizada con éxito");
        window.location.href = "../screens/salas.html";
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar sala: " + error.message);
    }
});