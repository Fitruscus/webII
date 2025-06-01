//----------------- Supabase ------------------
const SUPABASE_URL = 'https://mrnumxeejoghkwqvmybm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybnVteGVlam9naGt3cXZteWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTcxNDgsImV4cCI6MjA2Mjg5MzE0OH0.L92cogxvNfWU3DvKSk0suoaHO8mk7ftHtIogwkGIr78';

const TABLE_PETS = 'pets'; // Tabla de mascotas
const TABLE_CLIENTES = 'clientes'; // Tabla de clientes

const API_PETS_URL = `${SUPABASE_URL}/rest/v1/${TABLE_PETS}`;
const API_CLIENTES_URL = `${SUPABASE_URL}/rest/v1/${TABLE_CLIENTES}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Obtener lista de mascotas con nombre del dueño
const listaPets = () => {
    return fetch(`${API_PETS_URL}?select=*,clientes(nombre)`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener mascotas');
        return res.json();
    })
    .then(data => data.map(pet => ({
        ...pet,
        nombre_dueno: pet.clientes ? pet.clientes.nombre : null
    })));
};

// Obtener lista de clientes
const obtenerClientes = () => {
    return fetch(`${API_CLIENTES_URL}?select=id,nombre,email`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener clientes');
        return res.json();
    });
};

// Crear nueva mascota
const crearPet = (nombre, especie, edad, fecha_nacimiento, sexo, id_dueno) => {
    if (!id_dueno) {
        return Promise.reject(new Error('Debe seleccionar un dueño'));
    }
    
    const pet = {
        nombre,
        especie,
        edad,
        fecha_nacimiento,
        sexo,
        id_dueno,
        id: uuid.v4()
    };
    
    return fetch(API_PETS_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(pet)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear mascota');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : pet;
    });
};

// Eliminar mascota
const eliminarPet = (id) => {
    return fetch(`${API_PETS_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar mascota');
        }
        if (res.ok) {
            location.reload();
        }
        const text = await res.text();
        return text ? JSON.parse(text) : { id };
    });
};

// Obtener detalles de mascota con info del dueño
const detallePet = (id) => {
    return fetch(`${API_PETS_URL}?id=eq.${id}&select=*,clientes(nombre,email)`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener mascota');
        }
        const data = await res.json();
        return data[0] ? {
            ...data[0],
            nombre_dueno: data[0].clientes ? data[0].clientes.nombre : null
        } : null;
    });
};

// Actualizar mascota
const actualizarPet = (nombre, especie, edad, fecha_nacimiento, sexo, id_dueno, id) => {
    if (!id_dueno) {
        return Promise.reject(new Error('Debe seleccionar un dueño'));
    }
    
    return fetch(`${API_PETS_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            nombre,
            especie,
            edad,
            fecha_nacimiento,
            sexo,
            id_dueno
        })
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Error al actualizar mascota');
        }
        const data = await res.json();
        return data[0];
    });
};

export const petService = {
    listaPets,
    obtenerClientes,
    crearPet,
    eliminarPet,
    detallePet,
    actualizarPet
};

/*
EN EL SQL EDITOR DE SUPABASE PARA LAS TABLAS:

-- Para la tabla pets
CREATE POLICY "Allow public read access" 
ON pets FOR SELECT 
TO authenticated, anon
USING (true);

CREATE POLICY "Allow all" ON pets
FOR ALL
USING (true);

--  NO ES NECESARIA SI YA SE TIENE LA POLITICA DE "Allow all" en CLIENTES
-- Para la relación con clientes (asegurar que se pueda leer la info de clientes)
CREATE POLICY "Allow read clientes info" 
ON clientes FOR SELECT 
TO authenticated, anon
USING (true);

*/