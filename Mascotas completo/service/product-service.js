const SUPABASE_URL = 'https://mrnumxeejoghkwqvmybm.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybnVteGVlam9naGt3cXZteWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTcxNDgsImV4cCI6MjA2Mjg5MzE0OH0.L92cogxvNfWU3DvKSk0suoaHO8mk7ftHtIogwkGIr78';

const TABLE = 'productos'; 

const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listaProductos = () => {
    return fetch(`${API_URL}?select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener la lista de productos');
        }
        return res.json();
    });
};

const crearProducto = (nombre, precio, descripcion) => {
    const producto = {
        nombre,
        precio,
        descripcion,
        id: uuid.v4() 
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(producto)
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear el producto');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : producto;
    })
    .catch((error) => {
        console.error('Error en la creación del producto:', error);
        throw error;
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar el producto');
        }
        if (res.ok) {
            location.reload();
        }
        const text = await res.text();
        return text ? JSON.parse(text) : { id };
    })
    .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        throw error;
    });
};

const detalleProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers: HEADERS
    })
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener el producto');
        }
        const text = await res.text();
        return text ? JSON.parse(text) : null;
    })
    .catch((error) => {
        console.error('Error al consultar el producto:', error);
        throw error;
    });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH', 
        headers: {
            ...HEADERS,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, precio, descripcion })
    })
    .then(async (res) => {
        if (!res.ok) {
            const error = await res.text();
            throw new Error(error || 'Error al actualizar el producto');
        }
        const data = await res.json();
        return data[0]; 
    })
    .catch((error) => {
        console.error('Error en la actualización del producto:', error);
        throw error;
    });
};

const buscarProductos = (campo, valor) => {
    if (!valor || valor.trim() === '' || (campo === 'precio' && isNaN(valor))) {
        return listaProductos();
    }
    
    if (campo === 'precio') {
        return fetch(`${API_URL}?precio=eq.${valor}&select=*`, {
            headers: HEADERS
        })
        .then(res => {
            if (!res.ok) throw new Error('Error al buscar productos por precio');
            return res.json();
        });
    }
    
    return fetch(`${API_URL}?${campo}=ilike.%25${encodeURIComponent(valor)}%25&select=*`, {
        headers: HEADERS
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al buscar productos');
        return res.json();
    });
};

export const productService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
    buscarProductos
};
