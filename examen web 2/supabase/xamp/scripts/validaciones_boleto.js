// Validaciones para el formulario de boletos

// Validar fecha y hora
const validarFechaHora = () => {
    const fecha = document.querySelector('[data-fecha]').value;
    const hora = document.querySelector('[data-hora]').value;
    
    if (!fecha || !hora) {
        alert('Debes seleccionar fecha y hora');
        return false;
    }
    
    const fechaHora = new Date(fecha + 'T' + hora);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaHora < hoy) {
        alert('No puedes seleccionar una fecha y hora anterior al día actual');
        return false;
    }
    
    return true;
};

// Validar CI del cliente
document.querySelector('[data-ci-cliente]')?.addEventListener('input', function(e) {
    const ci = e.target.value;
    if (ci.length > 0 && !/^[0-9]+$/.test(ci)) {
        alert('El CI solo debe contener números');
        e.target.value = ci.replace(/[^0-9]/g, '');
    }
});

// Validar selección de sala y película
document.querySelector('[data-form-boleto]')?.addEventListener('submit', function(e) {
    const sala = document.querySelector('[data-sala]').value;
    const pelicula = document.querySelector('[data-pelicula]').value;
    const fecha = document.querySelector('[data-fecha]').value;
    const hora = document.querySelector('[data-hora]').value;
    
    if (!sala || !pelicula || !fecha || !hora) {
        e.preventDefault();
        alert('Debes seleccionar sala, película, fecha y hora');
        return;
    }
    
    if (!validarFechaHora()) {
        e.preventDefault();
        return;
    }
});

// Validar disponibilidad de boletos
const validarDisponibilidad = async (sala, fecha, hora) => {
    try {
        const response = await fetch(`https://miinpxhkwqqswhsglrkn.supabase.co/rest/v1/asignacion?nombre_sala=eq.${sala}&fecha=eq.${fecha}&horario_entrada_pelicula=eq.${hora}`, {
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paW5weGhrd3Fxc3doc2dscmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTc0NDIsImV4cCI6MjA2MzY3MzQ0Mn0.ZMVhQ0DXvOG4sBgdIHXlQtR0wG4zGDfa3KTsE_zRTwI',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paW5weGhrd3Fxc3doc2dscmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTc0NDIsImV4cCI6MjA2MzY3MzQ0Mn0.ZMVhQ0DXvOG4sBgdIHXlQtR0wG4zGDfa3KTsE_zRTwI'
            }
        });
        
        if (!response.ok) throw new Error('Error al verificar disponibilidad');
        
        const data = await response.json();
        if (data.length === 0) {
            alert('No hay asignación para esta sala, fecha y hora');
            return false;
        }
        
        const asignacion = data[0];
        if (!asignacion.boletos_disponibles || parseInt(asignacion.boletos_disponibles) <= 0) {
            alert('No hay boletos disponibles para esta función');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert('Error al verificar disponibilidad de boletos');
        return false;
    }
};

// Evento para verificar disponibilidad antes de enviar
document.querySelector('[data-form-boleto]')?.addEventListener('submit', async function(e) {
    const sala = document.querySelector('[data-sala]').value;
    const fecha = document.querySelector('[data-fecha]').value;
    const hora = document.querySelector('[data-hora]').value;
    
    if (!await validarDisponibilidad(sala, fecha, hora)) {
        e.preventDefault();
    }
});

// Validar que el cliente exista
const validarCliente = async (ci) => {
    try {
        const response = await fetch(`https://miinpxhkwqqswhsglrkn.supabase.co/rest/v1/cliente?ci=eq.${ci}`, {
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paW5weGhrd3Fxc3doc2dscmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTc0NDIsImV4cCI6MjA2MzY3MzQ0Mn0.ZMVhQ0DXvOG4sBgdIHXlQtR0wG4zGDfa3KTsE_zRTwI',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1paW5weGhrd3Fxc3doc2dscmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTc0NDIsImV4cCI6MjA2MzY3MzQ0Mn0.ZMVhQ0DXvOG4sBgdIHXlQtR0wG4zGDfa3KTsE_zRTwI'
            }
        });
        
        if (!response.ok) throw new Error('Error al verificar cliente');
        
        const data = await response.json();
        if (data.length === 0) {
            alert('El cliente no existe en el sistema');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error:', error);
        alert('Error al verificar cliente');
        return false;
    }
};

// Validar CI antes de enviar
document.querySelector('[data-form-boleto]')?.addEventListener('submit', async function(e) {
    const ci = document.querySelector('[data-ci-cliente]').value;
    
    if (!await validarCliente(ci)) {
        e.preventDefault();
    }
});