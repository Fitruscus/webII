import { boletoService } from "../../service/boleto-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    table.innerHTML = '';
};

const crearFilaBoleto = (boleto) => {
    // Función para formatear fecha sin problemas de zona horaria
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${boleto.nombre_boleto}</td>
        <td>${boleto.ci}</td>
        <td>${boleto.nombre_sala}</td>
        <td>${boleto.nombre_pelicula}</td>
        <td>${formatDate(boleto.fecha)}</td>
        <td>${boleto.horario_entrada_pelicula}</td>
        <td>
            <a href="screens/ver_info_boleto.html?nombre=${encodeURIComponent(boleto.nombre_boleto)}" 
               class="simple-button simple-button--info">
                Ver Info
            </a>
        </td>
    `;
    return fila;
};

const cargarBoletos = (boletos) => {
    limpiarTabla();
    boletos.forEach(boleto => {
        table.appendChild(crearFilaBoleto(boleto));
    });
};

const manejarBusqueda = () => {
    const campo = comboBox.value;
    const valor = buscadorInput.value.trim();
    
    boletoService.buscarBoletos(campo, valor)
        .then(cargarBoletos)
        .catch(error => {
            console.error("Error al buscar boletos:", error);
            alert("Ocurrió un error al buscar boletos");
        });
};

// Event listeners
buscadorInput.addEventListener('input', manejarBusqueda);
comboBox.addEventListener('change', manejarBusqueda);

// Carga inicial directa
boletoService.listarBoletos()
    .then(cargarBoletos)
    .catch(error => {
        console.error("Error al cargar boletos:", error);
        alert("Ocurrió un error al cargar los boletos");
    });