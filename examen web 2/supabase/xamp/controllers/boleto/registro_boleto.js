import { boletoService} from "../../service/boleto-service.js";
import { asignacionService } from "../../service/asignacion-service.js"
import { clienteService } from "../../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");
const buscadorCliente = document.querySelector("[data-buscador-cliente]");
const resultadosCliente = document.querySelector("[data-resultados-cliente]");
const buscadorAsignacion = document.querySelector("[data-buscador-asignacion]");
const resultadosAsignacion = document.querySelector("[data-resultados-asignacion]");
const comboBoxAsignacion = document.querySelector("[data-combobox-asignacion]");

// Generar nombre del boleto
const generarNombreBoleto = (asignacion) => {
    if (!asignacion) return '';
    return `boleto_${asignacion.nombre_sala}_${asignacion.nombre_pelicula}_${asignacion.fecha}_${asignacion.horario_entrada_pelicula}_${asignacion.boletos_disponibles || 0}`;
};

// Actualizar campos del formulario
const actualizarCampos = (cliente, asignacion) => {
    const nombreBoletoInput = document.querySelector("[data-nombre-boleto]");
    const ciInput = document.querySelector("[data-ci]");
    const asignacionInput = document.querySelector("[data-asignacion]");
    const boletosDisponiblesInput = document.querySelector("[data-boletos-disponibles]");

    if (cliente) {
        ciInput.value = cliente.ci;
    }

    if (asignacion) {
        asignacionInput.value = `${asignacion.nombre_sala} - ${asignacion.nombre_pelicula} - ${asignacion.fecha} - ${asignacion.horario_entrada_pelicula}`;
        boletosDisponiblesInput.value = asignacion.boletos_disponibles || 0;
        nombreBoletoInput.value = generarNombreBoleto(asignacion);
    }
};

// registro_boleto.js (versión corregida - parte del buscador de clientes)
const buscarClientes = debounce(() => {
    const valor = buscadorCliente.value.trim();
    
    if (valor.length < 2) {
        resultadosCliente.innerHTML = '';
        return;
    }
    
    clienteService.buscarClientes("ci", valor)
        .then(clientes => {
            resultadosCliente.innerHTML = '';
            clientes.forEach(cliente => {
                const item = document.createElement("div");
                item.className = "result-item";
                
                // Asegurarnos de que los datos existan antes de mostrarlos
                const nombre = cliente.nombre || '';
                const apellido = cliente.apellido || '';
                const ci = cliente.ci || '';
                
                item.innerHTML = `
                    <span class="result-text">${ci} - ${nombre} ${apellido}</span>
                    <button class="add-btn" data-ci="${ci}">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                `;
                resultadosCliente.appendChild(item);
                
                item.querySelector("button").addEventListener("click", () => {
                    actualizarCampos(cliente, null);
                    resultadosCliente.innerHTML = '';
                });
            });
        })
        .catch(error => {
            console.error("Error al buscar clientes:", error);
            resultadosCliente.innerHTML = '<div class="error-message">Error al buscar clientes</div>';
        });
}, 300);

// Buscar asignaciones
const buscarAsignaciones = debounce(() => {
    const campo = comboBoxAsignacion.value;
    const valor = buscadorAsignacion.value.trim();
    
    if (campo === 'fecha') {
        buscadorAsignacion.type = 'date';
    } else {
        buscadorAsignacion.type = 'text';
    }
    
    if (valor.length < 1 && campo !== 'fecha') {
        resultadosAsignacion.innerHTML = '';
        return;
    }
    
    asignacionService.buscarAsignaciones(campo, valor)
        .then(asignaciones => {
            resultadosAsignacion.innerHTML = '';
            asignaciones.forEach(asignacion => {
                const item = document.createElement("div");
                item.className = "result-item";
                item.innerHTML = `
                    <span class="result-text">
                        ${asignacion.nombre_sala} - ${asignacion.nombre_pelicula} - 
                        ${asignacion.fecha} - ${asignacion.horario_entrada_pelicula} - 
                        Boletos: ${asignacion.boletos_disponibles}
                    </span>
                    <button class="add-btn" 
                            data-nombre-sala="${asignacion.nombre_sala}"
                            data-nombre-pelicula="${asignacion.nombre_pelicula}"
                            data-fecha="${asignacion.fecha}"
                            data-horario="${asignacion.horario_entrada_pelicula}"
                            data-boletos="${asignacion.boletos_disponibles}">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                `;
                resultadosAsignacion.appendChild(item);
                
                item.querySelector("button").addEventListener("click", () => {
                    actualizarCampos(null, asignacion);
                    resultadosAsignacion.innerHTML = '';
                });
            });
        })
        .catch(error => {
            console.error("Error al buscar asignaciones:", error);
        });
}, 300);

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Event listeners para buscadores
buscadorCliente.addEventListener("input", buscarClientes);
buscadorAsignacion.addEventListener("input", buscarAsignaciones);
comboBoxAsignacion.addEventListener("change", buscarAsignaciones);

// registro_boleto.js (versión corregida - parte del submit)
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre_boleto = document.querySelector("[data-nombre-boleto]").value;
    const ci = document.querySelector("[data-ci]").value;
    const asignacionValue = document.querySelector("[data-asignacion]").value;
    
    if (!asignacionValue) {
        alert("Debes seleccionar una asignación");
        return;
    }
    
    const [nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula] = asignacionValue.split(" - ");
    const boletos_disponibles = parseInt(document.querySelector("[data-boletos-disponibles]").value);
    
    // Validar campos requeridos
    if (!nombre_boleto || !ci || !nombre_sala || !nombre_pelicula || !fecha || !horario_entrada_pelicula) {
        alert("Todos los campos son requeridos");
        return;
    }
    
    // Validar boletos disponibles
    if (isNaN(boletos_disponibles) || boletos_disponibles < 1) {
        alert("No hay boletos disponibles para esta asignación");
        return;
    }
    
    try {
        // 1. Primero actualizamos la asignación
        await boletoService.actualizarAsignacion(
            nombre_sala,
            nombre_pelicula,
            fecha,
            horario_entrada_pelicula,
            boletos_disponibles - 1
        );
        
        // 2. Luego creamos el boleto
        await boletoService.crearBoleto(
            nombre_boleto,
            ci,
            nombre_sala,
            nombre_pelicula,
            fecha,
            horario_entrada_pelicula
        );
        
        alert("Boleto registrado con éxito");
        // Redirección asegurada
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error al registrar boleto:", error);
        alert("Error al registrar boleto: " + (error.message || "Error desconocido"));
    }
});