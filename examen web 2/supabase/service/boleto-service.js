import { guardarDatos, cargarDatos, generarId } from './base-service.js';

const ARCHIVO_BOLETOS = 'boletos.json';

const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'boletos';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarBoletos = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener boletos');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarBoletos:', error);
        throw error;
    });
};

const buscarBoleto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar boleto');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarBoleto:', error);
        throw error;
    });
};

const crearBoleto = (datosBoleto) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(datosBoleto)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear boleto');
        return res.json();
    })
    .catch(error => {
        console.error('Error en crearBoleto:', error);
        throw error;
    });
};

const actualizarBoleto = (id, datosBoleto) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(datosBoleto)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar boleto');
        return res.json();
    })
    .catch(error => {
        console.error('Error en actualizarBoleto:', error);
        throw error;
    });
};

const eliminarBoleto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar boleto');
        return id;
    })
    .catch(error => {
        console.error('Error en eliminarBoleto:', error);
        throw error;
    });
};

const buscarBoletos = (campo, valor) => {
    if (!valor.trim()) return listarBoletos();
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar boletos');
        return res.json();
    })
    .catch(error => {
        console.error('Error en buscarBoletos:', error);
        throw error;
    });
};

// boleto-service.js (versión corregida)
const actualizarAsignacion = async (nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula, nuevos_boletos) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/asignacion?nombre_sala=eq.${nombre_sala}&nombre_pelicula=eq.${nombre_pelicula}&fecha=eq.${fecha}&horario_entrada_pelicula=eq.${horario_entrada_pelicula}`, {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify({ boletos_disponibles: nuevos_boletos })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar asignación');
        }
        
        // Supabase no devuelve contenido en PATCH exitosos
        return { success: true };
    } catch (error) {
        console.error('Error en actualizarAsignacion:', error);
        throw error;
    }
};

export const boletoService = {
    listarBoletos,
    buscarBoleto,
    crearBoleto,
    buscarBoletos,
    actualizarAsignacion
};

/*
CREATE POLICY "Allow public read access" 
ON boleto FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON boleto
FOR ALL
USING (true);
*/