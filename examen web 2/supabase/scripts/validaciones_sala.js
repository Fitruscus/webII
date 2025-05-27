export const validarNombreSala = (input) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, '');
    }
    // Validar que el nombre tenga al menos 3 caracteres
    if (input.value.length < 3) {
        alert('El nombre de la sala debe tener al menos 3 caracteres');
        input.value = '';
    }
};
const validarNombreSala = (input) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, '');
    }
    // Validar que el nombre tenga al menos 3 caracteres
    if (input.value.length < 3) {
        alert('El nombre de la sala debe tener al menos 3 caracteres');
        input.value = '';
    }
};

/**
 * Valida que el número de asientos sea un número entero válido
 * @param {HTMLInputElement} input - El elemento input a validar
 */
const validarAsientos = (input) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
    // Validar que el número de asientos sea un número válido
    const asientos = parseInt(input.value);
    if (asientos && (asientos < 1 || asientos > 500)) {
        alert('El número de asientos debe estar entre 1 y 500');
        input.value = '';
    }
};

// Eventos de validación para el formulario de salas
const elementosSala = [
    { selector: '[data-nombre-sala]', validator: validarNombreSala },
    { selector: '[data-asientos-sala]', validator: validarAsientos }
];

elementosSala.forEach(({ selector, validator }) => {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.addEventListener('input', (e) => validator(e.target));
    }
});

