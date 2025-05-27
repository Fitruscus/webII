import { validarLetras, validarNumeros, validarFecha, validarHora } from './validaciones_centralizadas.js';

export const validarFuncion = (input) => {
    const tipo = input.dataset.tipo;
    
    switch (tipo) {
        case 'pelicula':
            validarLetras(input);
            break;
        case 'sala':
            validarLetras(input);
            break;
        case 'fecha':
            validarFecha(input);
            break;
        case 'hora':
            validarHora(input);
            break;
        case 'precio':
            validarDecimales(input);
            const precio = parseFloat(input.value);
            if (precio && (precio < 0 || precio > 1000)) {
                alert('El precio debe estar entre 0 y 1000');
                input.value = '';
            }
            break;
        default:
            break;
    }
};

// Eventos de validación para el formulario de funciones
export const iniciarValidacionesFuncion = () => {
    const elementos = [
        { selector: '[data-pelicula]', validator: validarLetras },
        { selector: '[data-sala]', validator: validarLetras },
        { selector: '[data-fecha]', validator: validarFecha },
        { selector: '[data-hora]', validator: validarHora },
        { selector: '[data-precio]', validator: validarDecimales }
    ];

    elementos.forEach(({ selector, validator }) => {
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.addEventListener('input', (e) => validator(e.target));
        }
    });
};
