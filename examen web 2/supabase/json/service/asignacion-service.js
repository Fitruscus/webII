const SUPABASE_URL = 'https://xildmyzjmxkvqxdftjcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbGRteXpqbXhrdnF4ZGZ0amN1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Nzg2MjQ4NCwiZXhwIjoyMDYzNDM4NDg0fQ.L0sgD7M7VsKbH2nAuW_H4kcoKsq698df_Vdor13y_x8';

const TABLE = 'asignacion';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarAsignaciones = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener asignaciones');
        return res.json();
    })
    .catch(error => {
        console.error('Error en listarAsignaciones:', error);
        throw error;
    });
};

const buscarAsignacion = (nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula) => {
    return fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}&nombre_pelicula=eq.${nombre_pelicula}&fecha=eq.${fecha}&horario_entrada_pelicula=eq.${horario_entrada_pelicula}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar asignación');
        return res.json();
    })
    .then(data => data.length > 0 ? data[0] : null)
    .catch(error => {
        console.error('Error en buscarAsignacion:', error);
        throw error;
    });
};

const crearAsignacion = (nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula, boletos_disponibles) => {
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ nombre_sala, nombre_pelicula, fecha: fecha, horario_entrada_pelicula, boletos_disponibles })
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al crear asignación');
        return { nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula, boletos_disponibles };
    })
    .catch(error => {
        console.error('Error en crearAsignacion:', error);
        throw error;
    });
};

const eliminarAsignacion = (nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula) => {
    return fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}&nombre_pelicula=eq.${nombre_pelicula}&fecha=eq.${fecha}&horario_entrada_pelicula=eq.${horario_entrada_pelicula}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al eliminar asignación');
        return { nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula };
    })
    .catch(error => {
        console.error('Error en eliminarAsignacion:', error);
        throw error;
    });
};

const buscarAsignaciones = (campo, valor) => {
    if (!valor.trim()) return listarAsignaciones();
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar asignaciones');
        return res.json();
    })
    .catch(error => {
        console.error('Error en buscarAsignaciones:', error);
        throw error;
    });
};

const verificarDisponibilidad = async (nombre_sala, nombre_pelicula, fecha, horario_entrada_pelicula, duracion_pelicula) => {
    try {
        // Convertir duración a minutos
        const duracionMinutos = parseInt(duracion_pelicula);
        
        // Convertir horario a objeto Date
        const [horas, minutos] = horario_entrada_pelicula.split(':').map(Number);
        const horarioInicio = new Date();
        horarioInicio.setHours(horas, minutos, 0, 0);
        
        // Calcular horario de fin
        const horarioFin = new Date(horarioInicio.getTime() + duracionMinutos * 60000);
        
        // Obtener todas las asignaciones para esa sala y fecha
        const asignaciones = await fetch(`${API_URL}?nombre_sala=eq.${nombre_sala}&fecha=eq.${fecha}`, {
            headers: HEADERS
        }).then(res => res.json());
        
        // Verificar colisiones
        for (const asignacion of asignaciones) {
            const [hAsig, mAsig] = asignacion.horario_entrada_pelicula.split(':').map(Number);
            const inicioAsig = new Date();
            inicioAsig.setHours(hAsig, mAsig, 0, 0);
            
            const finAsig = new Date(inicioAsig.getTime() + parseInt(asignacion.duracion_pelicula) * 60000);
            
            if ((horarioInicio >= inicioAsig && horarioInicio < finAsig) || 
                (horarioFin > inicioAsig && horarioFin <= finAsig) ||
                (horarioInicio <= inicioAsig && horarioFin >= finAsig)) {
                return false; // Hay colisión
            }
        }
        
        return true; // No hay colisiones
    } catch (error) {
        console.error('Error en verificarDisponibilidad:', error);
        throw error;
    }
};

const verificarBoletosAsignacion = (nombre_sala, nombre_pelicula, fecha, horario) => {
    return fetch(`${SUPABASE_URL}/rest/v1/boleto?nombre_sala=eq.${nombre_sala}&nombre_pelicula=eq.${nombre_pelicula}&fecha=eq.${fecha}&horario_entrada_pelicula=eq.${horario}`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al verificar boletos');
        return res.json();
    })
    .then(data => data.length > 0);
};

export const asignacionService = {
    listarAsignaciones,
    buscarAsignacion,
    crearAsignacion,
    eliminarAsignacion,
    buscarAsignaciones,
    verificarDisponibilidad,
    verificarBoletosAsignacion
};

/*
-- Permisos para la tabla asignacion
CREATE POLICY "Allow public read access" 
ON asignacion FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON asignacion
FOR ALL
USING (true);
*/