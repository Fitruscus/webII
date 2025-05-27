// Validaciones para el formulario de películas

/**
 * Valida que el input solo contenga letras y espacios
 * @param {HTMLInputElement} input - El elemento input a validar
 */
const validarNombrePelicula = (input) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
};

/**
 * Valida que el input solo contenga números enteros
 * @param {HTMLInputElement} input - El elemento input a validar
 */
const validarDuracion = (input) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
    // Validar que la duración sea un número válido
    const duracion = parseInt(input.value);
    if (duracion && (duracion < 1 || duracion > 300)) {
        alert('La duración debe estar entre 1 y 300 minutos');
        input.value = '';
    }
};

// Eventos de validación para el formulario de películas
const elementosPelicula = [
    { selector: '[data-nombre-pelicula]', validator: validarNombrePelicula },
    { selector: '[data-duracion-pelicula]', validator: validarDuracion }
];

elementosPelicula.forEach(({ selector, validator }) => {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.addEventListener('input', (e) => validator(e.target));
    }
});