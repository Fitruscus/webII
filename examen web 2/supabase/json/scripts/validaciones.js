function validarLetras(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
}

function validarNumeros(input) {
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
}

function validarDecimales(input) {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9.]/g, '');
    }
    const partes = input.value.split('.');
    if (partes.length > 2) {
        input.value = partes[0] + '.' + partes[1];
    }
}

function validarDuracion(input) {
    validarNumeros(input);
    const duracion = parseInt(input.value);
    if (duracion && (duracion < 1 || duracion > 300)) {
        alert('La duración debe estar entre 1 y 300 minutos');
        input.value = '';
    }
}

function validarCapacidad(input) {
    validarNumeros(input);
    const capacidad = parseInt(input.value);
    if (capacidad && (capacidad < 1 || capacidad > 1000)) {
        alert('La capacidad debe estar entre 1 y 1000 personas');
        input.value = '';
    }
}

function validarBoletos(input) {
    validarNumeros(input);
    const cantidad = parseInt(input.value);
    if (cantidad && (cantidad < 1 || cantidad > 100)) {
        alert('La cantidad de boletos debe estar entre 1 y 100');
        input.value = '';
    }
}

function validarFecha(input) {
    const fecha = new Date(input.value);
    const hoy = new Date();
    
    if (fecha < hoy) {
        alert('La fecha no puede ser anterior al día actual');
        input.value = '';
    }
}

function validarHora(input) {
    const hora = input.value;
    const partes = hora.split(':');
    
    if (partes.length !== 2) {
        alert('Formato de hora inválido');
        input.value = '';
        return;
    }
    
    const horas = parseInt(partes[0]);
    const minutos = parseInt(partes[1]);
    
    if (horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        alert('Hora inválida');
        input.value = '';
    }
}

function validarFuncion(input) {
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
        case 'duracion':
            validarDuracion(input);
            break;
        case 'capacidad':
            validarCapacidad(input);
            break;
        case 'boletos':
            validarBoletos(input);
            break;
        default:
            break;
    }
};

function iniciarValidaciones() {
    // Eventos para cliente
    const elementosCliente = [
        { selector: '[data-nombre]', validator: validarLetras },
        { selector: '[data-apellido]', validator: validarLetras },
        { selector: '[data-ci]', validator: validarNumeros },
        { selector: '[data-telefono]', validator: validarNumeros }
    ];

    elementosCliente.forEach(({ selector, validator }) => {
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.addEventListener('input', (e) => validator(e.target));
        }
    });

    // Eventos para función
    const elementosFuncion = [
        { selector: '[data-pelicula]', validator: validarLetras },
        { selector: '[data-sala]', validator: validarLetras },
        { selector: '[data-fecha]', validator: validarFecha },
        { selector: '[data-hora]', validator: validarHora },
        { selector: '[data-precio]', validator: validarDecimales }
    ];

    elementosFuncion.forEach(({ selector, validator }) => {
        const elemento = document.querySelector(selector);
        if (elemento) {
            elemento.addEventListener('input', (e) => validator(e.target));
        }
    });
};

