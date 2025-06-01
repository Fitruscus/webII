//----------------- Supabase ------------------

// LLAMADAS DE CONEXION A SUPABASE
const SUPABASE_URL = 'https://mrnumxeejoghkwqvmybm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybnVteGVlam9naGt3cXZteWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTcxNDgsImV4cCI6MjA2Mjg5MzE0OH0.L92cogxvNfWU3DvKSk0suoaHO8mk7ftHtIogwkGIr78';

const TABLE = 'clientes'; // Nombre de la tabla en Supabase

const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`; 

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
}; 

// LLAMADA DEL REST: Funciones de llamado a la API de Supabase
const listaclientes = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener la lista de clientes');
        }
        return res.json();
    });
};

const crearCliente = (nombre, email) => {
    const cliente = {
        nombre,
        email,
        id: uuid.v4() // Genera un ID único para el nuevo cliente
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(cliente)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear el cliente');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : cliente; // Devuelve el cliente creado o el objeto vacío
    })
    .catch((error) => {
        console.error('Error en la creación del cliente:', error);
        throw error;
    });
};

const eliminarCliente = (id) => { // valor de entrada de referencia del elemento a eliminar
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar el cliente');
        }
        if (res.ok) {
            location.reload();
        }
        const text = await res.text();
        return text ? JSON.parse(text) : { id }; // Devuelve la respuesta o al menos el id eliminado
    })
    .catch((error) => {
        console.error('Error al eliminar el cliente:', error);
        throw error;
    });
};

const clientes = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener el cliente');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null; // Devuelve los datos o null si no hay contenido
    })
    .catch((error) => {
        console.error('Error al consultar el cliente:', error);
        throw error;
    });
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH', // reemplazo de PUT
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation' // Preferencia para obtener la representación del cliente actualizado
        },
        body: JSON.stringify({ nombre, email })
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Error al actualizar el cliente');
        }
        const data = await res.json();
        return data[0]; // Devuelve el cliente actualizado
    })
    .catch((error) => {
        console.error('Error en la actualización del cliente:', error);
        throw error;
    });
};

export const clientService={
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};

/*

EN EL SQL EDITOR DE SUPABASE

CREATE POLICY "Allow public read access" 
ON clientes FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON clientes
FOR ALL
USING (true);

*/