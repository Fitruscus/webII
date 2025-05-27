import { asignacionService } from "../../service/asignacion-service.js";
import { peliculaService } from "../../service/pelicula-service.js";
import { salaService } from "../../service/sala-service.js";

const formulario = document.querySelector("[data-form]");
const buscadorSala = document.querySelector("[data-buscador-sala]");
const resultadosSala = document.querySelector("[data-resultados-sala]");
const buscadorPelicula = document.querySelector("[data-buscador-pelicula]");
const resultadosPelicula = document.querySelector("[data-resultados-pelicula]");

// Time Picker Logic
const horasInput = document.querySelector("[data-hours]");
const minutosInput = document.querySelector("[data-minutes]");
const horarioHidden = document.querySelector("[data-horario]");

const updateTime = () => {
    const horas = horasInput.value.padStart(2, '0');
    const minutos = minutosInput.value.padStart(2, '0');
    horarioHidden.value = `${horas}:${minutos}:00`;
};

updateTime();

document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const part = e.target.getAttribute("data-time-part");
        const direction = e.target.getAttribute("data-direction");
        const input = part === "hours" ? horasInput : minutosInput;
        let value = parseInt(input.value) || 0;
        const max = part === "hours" ? 23 : 59;
        
        if (direction === "up") {
            value = value >= max ? 0 : value + 1;
        } else {
            value = value <= 0 ? max : value - 1;
        }
        
        input.value = value.toString().padStart(2, '0');
        updateTime();
    });
});

// Buscar salas
const buscarSalas = debounce(() => {
    const valor = buscadorSala.value.trim();
    
    if (valor.length < 2) {
        resultadosSala.innerHTML = '';
        return;
    }
    
    salaService.buscarSalas("nombre_sala", valor)
        .then(salas => {
            resultadosSala.innerHTML = '';
            salas.forEach(sala => {
                const item = document.createElement("div");
                item.className = "result-item";
                item.innerHTML = `
                    <span class="result-text">${sala.nombre_sala} (${sala.asientos_sala} asientos)</span>
                    <button class="add-btn" data-nombre-sala="${sala.nombre_sala}" data-asientos="${sala.asientos_sala}">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                `;
                resultadosSala.appendChild(item);
                
                item.querySelector("button").addEventListener("click", () => {
                    document.querySelector("[data-nombre-sala]").value = sala.nombre_sala;
                    document.querySelector("[data-nombre-sala]").setAttribute("data-asientos", sala.asientos_sala);
                    resultadosSala.innerHTML = '';
                });
            });
        })
        .catch(error => {
            console.error("Error al buscar salas:", error);
        });
}, 300);

// Buscar películas
const buscarPeliculas = debounce(() => {
    const valor = buscadorPelicula.value.trim();
    
    if (valor.length < 2) {
        resultadosPelicula.innerHTML = '';
        return;
    }
    
    peliculaService.buscarPeliculas("nombre_pelicula", valor)
        .then(peliculas => {
            resultadosPelicula.innerHTML = '';
            peliculas.forEach(pelicula => {
                const item = document.createElement("div");
                item.className = "result-item";
                item.innerHTML = `
                    <span class="result-text">${pelicula.nombre_pelicula} (${pelicula.duracion_pelicula} min)</span>
                    <button class="add-btn" data-nombre-pelicula="${pelicula.nombre_pelicula}" data-duracion="${pelicula.duracion_pelicula}">
                        <i class="fas fa-plus"></i> Agregar
                    </button>
                `;
                resultadosPelicula.appendChild(item);
                
                item.querySelector("button").addEventListener("click", () => {
                    document.querySelector("[data-nombre-pelicula]").value = pelicula.nombre_pelicula;
                    document.querySelector("[data-nombre-pelicula]").setAttribute("data-duracion", pelicula.duracion_pelicula);
                    resultadosPelicula.innerHTML = '';
                });
            });
        })
        .catch(error => {
            console.error("Error al buscar películas:", error);
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

buscadorSala.addEventListener("input", buscarSalas);
buscadorPelicula.addEventListener("input", buscarPeliculas);

// Función para convertir tiempo HH:MM:SS a minutos
const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

// Función para convertir minutos a tiempo HH:MM
const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// Validar y enviar formulario con validación de horarios
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const nombre_sala = document.querySelector("[data-nombre-sala]").value.trim();
    const nombre_pelicula = document.querySelector("[data-nombre-pelicula]").value.trim();
    const fechaInput = document.querySelector("[data-fecha]");
    const fecha = fechaInput.value; // Usamos directamente el string YYYY-MM-DD
    
    const horario = document.querySelector("[data-horario]").value;
    const duracion_pelicula = parseInt(document.querySelector("[data-nombre-pelicula]").getAttribute("data-duracion"));
    const asientos_sala = document.querySelector("[data-nombre-sala]").getAttribute("data-asientos");

    // Validar campos requeridos
    if (!nombre_sala || !nombre_pelicula || !fecha || !horario || isNaN(duracion_pelicula)) {
        alert("Todos los campos son requeridos y la duración debe ser válida");
        return;
    }

    try {
        // Obtener todas las asignaciones para esa sala y fecha
        const asignaciones = await asignacionService.buscarAsignaciones("nombre_sala", nombre_sala)
            .then(asignaciones => asignaciones.filter(a => a.fecha === fecha));
        
        // Convertir el nuevo horario a minutos desde medianoche
        const inicioNuevo = timeToMinutes(horario);
        const finNuevo = inicioNuevo + duracion_pelicula;
        
        // Verificar colisiones con asignaciones existentes
        for (const asignacion of asignaciones) {
            const peliculaAsignada = await peliculaService.buscarPeliculas("nombre_pelicula", asignacion.nombre_pelicula)
                .then(peliculas => peliculas[0]);
            
            if (!peliculaAsignada) continue;
            
            const duracionExistente = parseInt(peliculaAsignada.duracion_pelicula);
            if (isNaN(duracionExistente)) continue;
            
            const inicioExistente = timeToMinutes(asignacion.horario_entrada_pelicula);
            const finExistente = inicioExistente + duracionExistente;
            
            if ((inicioNuevo >= inicioExistente && inicioNuevo < finExistente) || 
                (finNuevo > inicioExistente && finNuevo <= finExistente) ||
                (inicioNuevo <= inicioExistente && finNuevo >= finExistente)) {
                
                const sugerencias = [];
                const tiempoLimpieza = 15;
                
                if (inicioExistente - duracion_pelicula - tiempoLimpieza >= 0) {
                    sugerencias.push(`Antes de ${asignacion.horario_entrada_pelicula}`);
                }
                
                const horarioSugerido = finExistente + tiempoLimpieza;
                sugerencias.push(`Después de ${minutesToTime(horarioSugerido)}`);
                
                throw new Error(`Conflicto de horario con la película "${asignacion.nombre_pelicula}" (${asignacion.horario_entrada_pelicula}). Horarios disponibles: ${sugerencias.join(' o ')}`);
            }
        }

        // Crear asignación
        await asignacionService.crearAsignacion(
            nombre_sala, 
            nombre_pelicula, 
            fecha, 
            horario, 
            asientos_sala
        );
        
        alert("Asignación registrada con éxito");
        window.location.href = "../screens/asignacion.html";
    } catch (error) {
        console.error("Error al registrar asignación:", error);
        alert("Error al registrar asignación: " + error.message);
    }
});
