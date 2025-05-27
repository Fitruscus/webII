import { boletoService } from "../../service/boleto-service.js";

const urlParams = new URLSearchParams(window.location.search);
const nombreBoleto = urlParams.get('nombre');

const cargarDetalleBoleto = () => {
    if (!nombreBoleto) {
        alert("No se especificó un boleto para mostrar");
        window.location.href = "../index.html";
        return;
    }
    
    boletoService.buscarBoleto(nombreBoleto)
        .then(boleto => {
            if (!boleto) {
                alert("Boleto no encontrado");
                window.location.href = "../index.html";
                return;
            }
            
            // Mostrar los datos del boleto
            document.querySelector("[data-nombre-boleto]").textContent = boleto.nombre_boleto;
            document.querySelector("[data-ci]").textContent = boleto.ci;
            document.querySelector("[data-nombre-sala]").textContent = boleto.nombre_sala;
            document.querySelector("[data-nombre-pelicula]").textContent = boleto.nombre_pelicula;
            document.querySelector("[data-fecha]").textContent = new Date(boleto.fecha).toLocaleDateString();
            document.querySelector("[data-horario]").textContent = boleto.horario_entrada_pelicula;
        })
        .catch(error => {
            console.error("Error al cargar boleto:", error);
            alert("Ocurrió un error al cargar el boleto");
            window.location.href = "../index.html";
        });
};

// Cargar los datos al iniciar la página
cargarDetalleBoleto();