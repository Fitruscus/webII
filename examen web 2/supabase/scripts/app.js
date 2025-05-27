// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeElemento = document.querySelector('.mensaje');
    if (mensajeElemento) {
        mensajeElemento.textContent = mensaje;
        mensajeElemento.className = `mensaje ${tipo}`;
        setTimeout(() => {
            mensajeElemento.textContent = '';
            mensajeElemento.className = 'mensaje';
        }, 3000);
    }
}

// Función para mostrar errores
function mostrarError(error) {
    console.error('Error:', error);
    mostrarMensaje(error.message || 'Ocurrió un error', 'error');
}

// Función para manejar la navegación entre páginas
function navegar(url) {
    window.location.href = url;
}

// Agregar evento click a los enlaces del menú
document.addEventListener('DOMContentLoaded', function() {
    const enlaces = document.querySelectorAll('.menu a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            navegar(url);
        });
    });
});

// Inicializar funciones CRUD al cargar la página
window.addEventListener('load', async function() {
    try {
        const rutaActual = window.location.pathname;
        console.log('Inicializando página:', rutaActual);
        
        if (rutaActual.endsWith('clientes.html')) {
            await listarClientes();
        } else if (rutaActual.endsWith('peliculas.html')) {
            await listarPeliculas();
        } else if (rutaActual.endsWith('salas.html')) {
            await listarSalas();
        } else if (rutaActual.endsWith('boletos.html')) {
            await listarBoletos();
        } else if (rutaActual.endsWith('funciones.html')) {
            await listarFunciones();
        } else if (rutaActual.endsWith('asignaciones.html')) {
            await listarAsignaciones();
        }
    } catch (error) {
        console.error('Error al inicializar la página:', error);
        mostrarError('Error al cargar la página');
    }
});

// Asegurar que las funciones CRUD estén disponibles globalmente
window.listarPeliculas = listarPeliculas;
window.crearPelicula = crearPelicula;
window.editarPelicula = editarPelicula;
window.eliminarPelicula = eliminarPelicula;

window.listarSalas = listarSalas;
window.crearSala = crearSala;
window.editarSala = editarSala;
window.eliminarSala = eliminarSala;

window.listarBoletos = listarBoletos;
window.crearBoleto = crearBoleto;
window.editarBoleto = editarBoleto;
window.eliminarBoleto = eliminarBoleto;

window.listarAsignaciones = listarAsignaciones;
window.crearAsignacion = crearAsignacion;
window.editarAsignacion = editarAsignacion;
window.eliminarAsignacion = eliminarAsignacion;

window.listarFunciones = listarFunciones;
window.crearFuncion = crearFuncion;
window.editarFuncion = editarFuncion;
window.eliminarFuncion = eliminarFuncion;

// Funciones CRUD para Clientes
async function listarClientes() {
    try {
        const clientes = await supabaseRequest('clientes', 'GET');
        const tbody = document.querySelector('tbody');
        
        if (!tbody) {
            console.error('No se encontró el elemento tbody');
            return;
        }

        tbody.innerHTML = '';
        
        if (Array.isArray(clientes)) {
            clientes.forEach(cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.nombre || ''}</td>
                    <td>${cliente.email || ''}</td>
                    <td>${cliente.telefono || ''}</td>
                    <td>
                        <button onclick="editarCliente(${cliente.id})" class="btn-edit">Editar</button>
                        <button onclick="eliminarCliente(${cliente.id})" class="btn-delete">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('La respuesta no es un array:', clientes);
        }
    } catch (error) {
        console.error('Error al listar clientes:', error);
        mostrarError('Error al cargar los clientes');
    }
}

// Evento submit para el formulario de clientes
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-clientes');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(form);
            const datos = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono') || null
            };

            console.log('Datos del formulario:', datos);
            
            try {
                await crearCliente(datos);
                mostrarMensaje('Cliente creado exitosamente', 'success');
                form.reset();
                listarClientes();
            } catch (error) {
                mostrarError(error);
            }
        });
    }
});

async function crearCliente(datos) {
    try {
        // Validar que los datos existan
        if (!datos.nombre || !datos.email) {
            throw new Error('Nombre y email son requeridos');
        }

        // Formatear los datos según lo que espera Supabase
        const datosFormato = {
            nombre: datos.nombre,
            email: datos.email,
            telefono: datos.telefono || null
        };

        console.log('Datos a enviar a Supabase:', datosFormato);

        // Enviar los datos directamente en el body
        const resultado = await supabaseRequest('clientes', 'POST', {
            body: JSON.stringify(datosFormato)
        });
        
        console.log('Respuesta de Supabase:', resultado);
        mostrarMensaje('Cliente creado exitosamente', 'success');
        return resultado;
    } catch (error) {
        console.error('Error detallado:', error);
        mostrarError(`Error al crear el cliente: ${error.message}`);
        throw error;
    }
}

async function editarCliente(id, datos) {
    return supabaseRequest(`clientes?id=eq.${id}`, 'PATCH', { body: datos });
}

async function eliminarCliente(id) {
    return supabaseRequest(`clientes?id=eq.${id}`, 'DELETE');
}

// Funciones CRUD para Películas
async function listarPeliculas() {
    try {
        const peliculas = await supabaseRequest('peliculas', 'GET');
        const tbody = document.querySelector('tbody');
        
        if (!tbody) {
            console.error('No se encontró el elemento tbody');
            return;
        }

        tbody.innerHTML = '';
        
        if (Array.isArray(peliculas)) {
            peliculas.forEach(pelicula => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${pelicula.titulo || ''}</td>
                    <td>${pelicula.genero || ''}</td>
                    <td>${pelicula.duracion || 0} min</td>
                    <td>${pelicula.clasificacion || ''}</td>
                    <td>
                        <button onclick="editarPelicula(${pelicula.id})" class="btn-edit">Editar</button>
                        <button onclick="eliminarPelicula(${pelicula.id})" class="btn-delete">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error('La respuesta no es un array:', peliculas);
        }
    } catch (error) {
        console.error('Error al listar películas:', error);
        mostrarError('Error al cargar las películas');
    }
}

async function crearPelicula(datos) {
    try {
        const datosFormato = {
            titulo: datos.titulo,
            genero: datos.genero,
            duracion: datos.duracion,
            clasificacion: datos.clasificacion,
            sinopsis: datos.sinopsis
        };

        const resultado = await supabaseRequest('peliculas', 'POST', {
            body: JSON.stringify({
                data: datosFormato
            })
        });
        
        console.log('Película creada exitosamente:', resultado);
        mostrarMensaje('Película creada exitosamente', 'success');
        return resultado;
    } catch (error) {
        console.error('Error al crear la película:', error);
        mostrarError('Error al crear la película');
        throw error;
    }
}

async function editarPelicula(id, datos) {
    return supabaseRequest(`peliculas?id=eq.${id}`, 'PATCH', { body: datos });
}

async function eliminarPelicula(id) {
    return supabaseRequest(`peliculas?id=eq.${id}`, 'DELETE');
}

// Funciones CRUD para Salas
async function listarSalas() {
    const salas = await supabaseRequest('salas', 'GET');
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    salas.forEach(sala => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sala.nombre}</td>
            <td>${sala.capacidad}</td>
            <td>${sala.tipo}</td>
            <td>${sala.descripcion}</td>
            <td>
                <button onclick="editarSala(${sala.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarSala(${sala.id})" class="btn-delete">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function crearSala(datos) {
    return supabaseRequest('salas', 'POST', { body: datos });
}

async function editarSala(id, datos) {
    return supabaseRequest(`salas?id=eq.${id}`, 'PATCH', { body: datos });
}

async function eliminarSala(id) {
    return supabaseRequest(`salas?id=eq.${id}`, 'DELETE');
}

// Funciones CRUD para Boletos
async function listarBoletos() {
    const boletos = await supabaseRequest('boletos', 'GET');
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    boletos.forEach(boleto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${boleto.funcion_id}</td>
            <td>${boleto.cliente_id}</td>
            <td>${boleto.asiento}</td>
            <td>${boleto.precio}</td>
            <td>
                <button onclick="editarBoleto(${boleto.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarBoleto(${boleto.id})" class="btn-delete">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function crearBoleto(datos) {
    return supabaseRequest('boletos', 'POST', { body: datos });
}

async function editarBoleto(id, datos) {
    return supabaseRequest(`boletos?id=eq.${id}`, 'PATCH', { body: datos });
}

async function eliminarBoleto(id) {
    return supabaseRequest(`boletos?id=eq.${id}`, 'DELETE');
}

// Funciones CRUD para Funciones
async function listarFunciones() {
    const funciones = await supabaseRequest('funciones', 'GET');
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    funciones.forEach(funcion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${funcion.pelicula_id}</td>
            <td>${funcion.sala_id}</td>
            <td>${funcion.horario}</td>
            <td>
                <button onclick="editarFuncion(${funcion.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarFuncion(${funcion.id})" class="btn-delete">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function crearFuncion(datos) {
    return supabaseRequest('funciones', 'POST', { body: datos });
}

async function editarFuncion(id, datos) {
    return supabaseRequest(`funciones?id=eq.${id}`, 'PATCH', { body: datos });
}

async function eliminarFuncion(id) {
    return supabaseRequest(`funciones?id=eq.${id}`, 'DELETE');
}

// Funciones CRUD para Asignaciones
async function listarAsignaciones() {
    const asignaciones = await supabaseRequest('asignacion', 'GET');
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    asignaciones.forEach(asignacion => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${asignacion.nombre_sala}</td>
            <td>${asignacion.nombre_pelicula}</td>
            <td>${asignacion.fecha}</td>
            <td>${asignacion.horario_entrada_pelicula}</td>
            <td>${asignacion.boletos_disponibles}</td>
            <td>
                <button onclick="mostrarFormularioEditarAsignacion(${asignacion.id})" class="btn-edit">Editar</button>
                <button onclick="mostrarConfirmacionEliminarAsignacion(${asignacion.id})" class="btn-delete">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function crearAsignacion(datos) {
    try {
        const resultado = await supabaseRequest('asignacion', 'POST', { body: datos });
        mostrarMensaje('Asignación creada exitosamente', 'success');
        return resultado;
    } catch (error) {
        mostrarError(error);
        throw error;
    }
}

async function editarAsignacion(id, datos) {
    try {
        const resultado = await supabaseRequest(`asignacion?id=eq.${id}`, 'PATCH', { body: datos });
        mostrarMensaje('Asignación actualizada exitosamente', 'success');
        return resultado;
    } catch (error) {
        mostrarError(error);
        throw error;
    }
}

async function eliminarAsignacion(id) {
    try {
        const resultado = await supabaseRequest(`asignacion?id=eq.${id}`, 'DELETE');
        mostrarMensaje('Asignación eliminada exitosamente', 'success');
        return resultado;
    } catch (error) {
        mostrarError(error);
        throw error;
    }
}

// Función para mostrar formulario de edición de asignación
async function mostrarFormularioEditarAsignacion(id) {
    const asignacion = await supabaseRequest(`asignacion?id=eq.${id}`, 'GET');
    document.getElementById('nombre_sala').value = asignacion[0].nombre_sala;
    document.getElementById('nombre_pelicula').value = asignacion[0].nombre_pelicula;
    document.getElementById('fecha').value = asignacion[0].fecha;
    document.getElementById('horario_entrada_pelicula').value = asignacion[0].horario_entrada_pelicula;
    document.getElementById('boletos_disponibles').value = asignacion[0].boletos_disponibles;
    
    document.getElementById('form-asignaciones').addEventListener('submit', async (e) => {
        e.preventDefault();
        const datos = {
            nombre_sala: document.getElementById('nombre_sala').value,
            nombre_pelicula: document.getElementById('nombre_pelicula').value,
            fecha: document.getElementById('fecha').value,
            horario_entrada_pelicula: document.getElementById('horario_entrada_pelicula').value,
            boletos_disponibles: document.getElementById('boletos_disponibles').value
        };
        try {
            await editarAsignacion(id, datos);
            mostrarMensaje('Asignación actualizada exitosamente', 'success');
            listarAsignaciones();
        } catch (error) {
            mostrarError(error);
        }
    });
}

// Función para mostrar confirmación de eliminación de asignación
async function mostrarConfirmacionEliminarAsignacion(id) {
    if (confirm('¿Estás seguro de eliminar esta asignación?')) {
        try {
            await eliminarAsignacion(id);
            mostrarMensaje('Asignación eliminada exitosamente', 'success');
            listarAsignaciones();
        } catch (error) {
            mostrarError(error);
        }
    }
}
