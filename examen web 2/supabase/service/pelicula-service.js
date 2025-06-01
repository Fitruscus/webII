const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'peliculas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarPeliculas = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener películas');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarPeliculas:', error);
        throw error;
    });
};

const buscarPeliculaPorNombre = (nombre_pelicula) => {
    return fetch(`${API_URL}?nombre_pelicula=eq.${nombre_pelicula}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar película');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarPeliculaPorNombre:', error);
        throw error;
    });
};

const crearPelicula = (nombre_pelicula, duracion_pelicula) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ nombre_pelicula, duracion_pelicula })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear película');
        return { nombre_pelicula, duracion_pelicula };
    })
    .catch(error => {
        console.error('Error en crearPelicula:', error);
        throw error;
    });
};

const actualizarPelicula = (nombre_pelicula, duracion_pelicula) => {
    return fetch(`${API_URL}?nombre_pelicula=eq.${nombre_pelicula}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ duracion_pelicula })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar película');
        return res.json();
    })
    .catch(error => {
        console.error('Error en actualizarPelicula:', error);
        throw error;
    });
};

const eliminarPelicula = (nombre_pelicula) => {
    return fetch(`${API_URL}?nombre_pelicula=eq.${nombre_pelicula}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar película');
        return nombre_pelicula;
    })
    .catch(error => {
        console.error('Error en eliminarPelicula:', error);
        throw error;
    });
};

const buscarPeliculas = (campo, valor) => {
    if (!valor.trim()) return listarPeliculas();
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar películas');
        return res.json();
    })
    .catch(error => {
        console.error('Error en buscarPeliculas:', error);
        throw error;
    });
};

const verificarAsignacionesPelicula = (nombre_pelicula) => {
    return fetch(`${SUPABASE_URL}/rest/v1/asignacion?nombre_pelicula=eq.${nombre_pelicula}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al verificar asignaciones');
        return res.json();
    })
    .then(data => data.length > 0);
};

export const peliculaService = {
    listarPeliculas,
    buscarPeliculaPorNombre,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
    buscarPeliculas,
    verificarAsignacionesPelicula
};

/*
-- Permisos para la tabla pelicula
CREATE POLICY "Allow public read access" 
ON pelicula FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON pelicula
FOR ALL
USING (true);
*/