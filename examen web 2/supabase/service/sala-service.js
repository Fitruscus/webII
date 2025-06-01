const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'salas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarSalas = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener salas');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarSalas:', error);
        throw error;
    });
};

const buscarSalaPorNombre = (nombre_sala) => {
    return fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar sala');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarSalaPorNombre:', error);
        throw error;
    });
};

const crearSala = (nombre_sala, asientos_sala) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ nombre_sala, asientos_sala })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear sala');
        return { nombre_sala, asientos_sala };
    })
    .catch(error => {
        console.error('Error en crearSala:', error);
        throw error;
    });
};

const actualizarSala = (nombre_sala, asientos_sala) => {
    return fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ asientos_sala })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar sala');
        return res.json();
    })
    .catch(error => {
        console.error('Error en actualizarSala:', error);
        throw error;
    });
};

const eliminarSala = (nombre_sala) => {
    return fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar sala');
        return nombre_sala;
    })
    .catch(error => {
        console.error('Error en eliminarSala:', error);
        throw error;
    });
};

const buscarSalas = (campo, valor) => {
    if (!valor.trim()) return listarSalas();
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar salas');
        return res.json();
    })
    .catch(error => {
        console.error('Error en buscarSalas:', error);
        throw error;
    });
};

// En sala-service.js
const verificarAsignacionesSala = (nombre_sala) => {
    return fetch(`${SUPABASE_URL}/rest/v1/asignacion?nombre_sala=eq.${nombre_sala}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al verificar asignaciones');
        return res.json();
    })
    .then(data => data.length > 0);
};

export const salaService = {
    listarSalas,
    buscarSalaPorNombre,
    crearSala,
    actualizarSala,
    eliminarSala,
    buscarSalas,
    verificarAsignacionesSala
};

/*
-- Permisos para la tabla salas (igual que clientes)
CREATE POLICY "Allow public read access" 
ON sala FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON sala
FOR ALL
USING (true);
*/