const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'funciones';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarFunciones = () => {
    return fetch(`${API_URL}?select=*,peliculas(titulo),salas(nombre)&order=horario.desc`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener funciones');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarFunciones:', error);
        throw error;
    });
};

const buscarFuncion = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar función');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarFuncion:', error);
        throw error;
    });
};

const crearFuncion = (pelicula_id, sala_id, horario) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ pelicula_id, sala_id, horario })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear función');
        return res.json();
    })
    .catch(error => {
        console.error('Error en crearFuncion:', error);
        throw error;
    });
};

const actualizarFuncion = (id, pelicula_id, sala_id, horario) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ pelicula_id, sala_id, horario })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar función');
        return res.json();
    })
    .catch(error => {
        console.error('Error en actualizarFuncion:', error);
        throw error;
    });
};

const eliminarFuncion = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar función');
        return id;
    })
    .catch(error => {
        console.error('Error en eliminarFuncion:', error);
        throw error;
    });
};

export { crearFuncion, eliminarFuncion };
