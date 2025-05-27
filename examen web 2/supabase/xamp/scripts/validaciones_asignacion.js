// Validaciones para el formulario de asignación

/**
 * Valida que la fecha seleccionada no sea anterior a la fecha actual
 * @param {Event} e - El evento de cambio de fecha
 */
const validarFecha = (e) => {
    const fechaSeleccionadaStr = e.target.value;
    if (!fechaSeleccionadaStr) return;
    
    const fechaSeleccionada = new Date(fechaSeleccionadaStr + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
        alert("No puedes seleccionar una fecha anterior al día actual");
        e.target.value = "";
    }
};

/**
 * Valida que la hora ingresada sea un formato de hora válido
 * @param {string} hora - La hora a validar
 * @returns {boolean} - True si la hora es válida, false si no
 */
const validarHora = (hora) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return regex.test(hora);
};

/**
 * Valida que la duración sea un número válido
 * @param {number} duracion - La duración a validar
 * @returns {boolean} - True si la duración es válida, false si no
 */
const validarDuracion = (duracion) => {
    return !isNaN(duracion) && duracion > 0 && duracion <= 300;
};

/**
 * Valida que los campos de sala y película no estén vacíos
 * @param {Event} e - El evento de envío del formulario
 */
const validarFormulario = (e) => {
    const nombre_sala = document.querySelector("[data-nombre-sala]").value.trim();
    const nombre_pelicula = document.querySelector("[data-nombre-pelicula]").value.trim();
    const fecha = document.querySelector("[data-fecha]").value;
    const hora = document.querySelector("[data-hora]").value;
    
    if (!nombre_sala || !nombre_pelicula) {
        e.preventDefault();
        alert("Debes seleccionar una sala y una película");
        return;
    }
    
    if (!fecha) {
        e.preventDefault();
        alert("Debes seleccionar una fecha");
        return;
    }
    
    if (!hora || !validarHora(hora)) {
        e.preventDefault();
        alert("Debes ingresar una hora válida (HH:MM:SS)");
        return;
    }
};

// Eventos de validación
document.querySelector("[data-fecha]")?.addEventListener("change", validarFecha);
document.querySelector("[data-form]")?.addEventListener("submit", validarFormulario);

// Exportar funciones para uso externo
window.validarHora = validarHora;
window.validarDuracion = validarDuracion;