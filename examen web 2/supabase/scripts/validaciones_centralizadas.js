// Validaciones centralizadas para todas las entidades

export const validarLetras = (input) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
};

export const validarNumeros = (input) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/\D/g, '');
    }
};

export const validarDecimales = (input) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9.]/g, '');
    }
    const partes = input.value.split('.');
    if (partes.length > 2) {
        input.value = partes[0] + '.' + partes[1];
    }
};

export const validarDuracion = (input) => {
    validarNumeros(input);
    const duracion = parseInt(input.value);
    if (duracion && (duracion < 1 || duracion > 300)) {
        alert('La duración debe estar entre 1 y 300 minutos');
        input.value = '';
    }
};

export const validarCapacidad = (input) => {
    validarNumeros(input);
    const capacidad = parseInt(input.value);
    if (capacidad && (capacidad < 1 || capacidad > 1000)) {
        alert('La capacidad debe estar entre 1 y 1000 personas');
        input.value = '';
    }
};

export const validarBoletos = (input) => {
    validarNumeros(input);
    const cantidad = parseInt(input.value);
    if (cantidad && (cantidad < 1 || cantidad > 100)) {
        alert('La cantidad de boletos debe estar entre 1 y 100');
        input.value = '';
    }
};

export const validarFecha = (input) => {
    const fecha = new Date(input.value);
    const hoy = new Date();
    
    if (fecha < hoy) {
        alert('La fecha no puede ser anterior al día actual');
        input.value = '';
    }
};

export const validarHora = (input) => {
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
};
