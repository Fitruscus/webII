// Configuración de Supabase
const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjI0ODQsImV4cCI6MjA2MzQzODQ4NH0.5plj_NkMzybGhCYmZ6zRRA8HJDeX77zLBD4mj-pUZck';

// Función para hacer peticiones a Supabase
function supabaseRequest(endpoint, method = 'GET', options = {}) {
    try {
        const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
        const headers = {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        };

        console.log('Haciendo petición a:', url);
        console.log('Método:', method);
        console.log('Headers:', headers);
        console.log('Body:', options.body);

        return fetch(url, {
            method,
            headers,
            ...options
        })
        .then(response => {
            console.log('Respuesta status:', response.status);
            
            if (!response.ok) {
                return response.json().catch(() => ({ 
                    error: `Error ${response.status}: ${response.statusText}`,
                    details: response.statusText
                })).then(data => {
                    console.log('Error de Supabase:', data);
                    throw new Error(data.error || `Error ${response.status}: ${data.details || response.statusText}`);
                });
            }
            
            return response.json().then(data => {
                console.log('Datos recibidos:', data);
                return data;
            });
        })
        .catch(error => {
            console.error('Error en supabaseRequest:', error);
            throw new Error(`Error en la petición a Supabase: ${error.message}`);
        });
    } catch (error) {
        console.error('Error de configuración:', error);
        throw new Error('Error de configuración con Supabase. Por favor, intenta nuevamente.');
    }
}

// Exportar la función para que sea accesible desde otros archivos
window.supabaseRequest = supabaseRequest;

// Funciones para cada entidad
function listarClientes() {
    return supabaseRequest('clientes', 'GET', { select: '*' });
}

function crearCliente(datos) {
    return supabaseRequest('clientes', 'POST', { body: JSON.stringify(datos) });
}

function editarCliente(id, datos) {
    return supabaseRequest(`clientes?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarCliente(id) {
    return supabaseRequest(`clientes?id=eq.${id}`, 'DELETE');
}

function listarPeliculas() {
    return supabaseRequest('peliculas', 'GET', { select: '*' });
}

function crearPelicula(datos) {
    return supabaseRequest('peliculas', 'POST', { body: JSON.stringify(datos) });
}

function editarPelicula(id, datos) {
    return supabaseRequest(`peliculas?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarPelicula(id) {
    return supabaseRequest(`peliculas?id=eq.${id}`, 'DELETE');
}

function listarSalas() {
    return supabaseRequest('salas', 'GET', { select: '*' });
}

function crearSala(datos) {
    return supabaseRequest('salas', 'POST', { body: JSON.stringify(datos) });
}

function editarSala(id, datos) {
    return supabaseRequest(`salas?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarSala(id) {
    return supabaseRequest(`salas?id=eq.${id}`, 'DELETE');
}

function listarFunciones() {
    return supabaseRequest('funciones', 'GET', { select: '*' });
}

function crearFuncion(datos) {
    return supabaseRequest('funciones', 'POST', { body: JSON.stringify(datos) });
}

function editarFuncion(id, datos) {
    return supabaseRequest(`funciones?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarFuncion(id) {
    return supabaseRequest(`funciones?id=eq.${id}`, 'DELETE');
}

function listarBoletos() {
    return supabaseRequest('boletos', 'GET', { select: '*' });
}

function crearBoleto(datos) {
    return supabaseRequest('boletos', 'POST', { body: JSON.stringify(datos) });
}

function editarBoleto(id, datos) {
    return supabaseRequest(`boletos?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarBoleto(id) {
    return supabaseRequest(`boletos?id=eq.${id}`, 'DELETE');
}

function listarAsignaciones() {
    return supabaseRequest('asignacion', 'GET', { select: '*' });
}

function crearAsignacion(datos) {
    return supabaseRequest('asignacion', 'POST', { body: JSON.stringify(datos) });
}

function editarAsignacion(id, datos) {
    return supabaseRequest(`asignacion?id=eq.${id}`, 'PATCH', { body: JSON.stringify(datos) });
}

function eliminarAsignacion(id) {
    return supabaseRequest(`asignacion?id=eq.${id}`, 'DELETE');
}
