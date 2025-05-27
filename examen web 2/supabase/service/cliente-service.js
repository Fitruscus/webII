const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'clientes';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarClientes = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener clientes');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarClientes:', error);
        throw error;
    });
};

const buscarClientePorCI = (ci) => {
    return fetch(`${API_URL}?ci=eq.${ci}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar cliente');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarClientePorCI:', error);
        throw error;
    });
};

const crearCliente = (ci, nombre, apellido, telefono) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ ci, nombre, apellido, telefono })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear cliente');
        return res.json();
    })
    .catch(error => {
        console.error('Error en crearCliente:', error);
        throw error;
    });
};

const actualizarCliente = (ci, nombre, apellido, telefono) => {
    return fetch(`${API_URL}?ci=eq.${ci}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, apellido, telefono })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar cliente');
        return res.json();
    })
    .catch(error => {
        console.error('Error en actualizarCliente:', error);
        throw error;
    });
};

const eliminarCliente = (ci) => {
    return fetch(`${API_URL}?ci=eq.${ci}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar cliente');
        return ci;
    })
    .catch(error => {
        console.error('Error en eliminarCliente:', error);
        throw error;
    });
};

const buscarClientes = (campo, valor) => {
    if (!valor.trim()) return listarClientes();
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar clientes');
        return res.json();
    })
    .catch(error => {
        console.error('Error en buscarClientes:', error);
        throw error;
    });
};

const verificarAsignacionesCliente = (ci) => {
    return fetch(`${SUPABASE_URL}/rest/v1/boleto?ci=eq.${ci}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al verificar boletos');
        return res.json();
    })
    .then(data => data.length > 0)
    .catch(error => {
        console.error('Error en verificarAsignacionesCliente:', error);
        throw error;
    });
};

export const clienteService = {
    listarClientes,
    buscarClientePorCI,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    buscarClientes,
    verificarAsignacionesCliente
};

// Permisos para la tabla clientes
// CREATE POLICY "Allow public read access" 
// ON cliente FOR SELECT 
// TO authenticated, anon
// USING (true);

// CREATE POLICY "Allow all" ON cliente
// FOR ALL
// USING (true);
