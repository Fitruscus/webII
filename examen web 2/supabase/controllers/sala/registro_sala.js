import { salaService } from "../../service/sala-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nombre_sala = document.querySelector("[data-nombre-sala]").value.trim();
    const asientos_sala = document.querySelector("[data-asientos-sala]").value.trim();

    // Verificar si la sala ya existe
    salaService.buscarSalaPorNombre(nombre_sala)
        .then(salaExistente => {
            if (salaExistente) {
                throw new Error("El nombre de sala ya está registrado");
            }
            return salaService.crearSala(nombre_sala, asientos_sala);
        })
        .then(() => {
            alert("Sala registrada con éxito");
            window.location.href = "../screens/salas.html";
        })
        .catch(error => {
            console.error("Error al registrar:", error);
            alert("Error al registrar sala: " + error.message);
        });
});