// Configuración centralizada para Supabase
const SUPABASE_CONFIG = {
    URL: '',
    KEY: ''
};

// Función para crear headers estándar
const createHeaders = () => ({
    'apikey': SUPABASE_CONFIG.KEY,
    'Authorization': `Bearer ${SUPABASE_CONFIG.KEY}`,
    'Content-Type': 'application/json'
});

// Función para crear URL de API
const createApiUrl = (table) => `${SUPABASE_CONFIG.URL}/rest/v1/${table}`;

// Función para hacer peticiones a Supabase
const supabaseRequest = async (table, method = 'GET', params = {}, body = null) => {
    try {
        const url = new URL(createApiUrl(table));
        
        // Agregar parámetros a la URL
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, value);
            }
        });

        const response = await fetch(url.toString(), {
            method,
            headers: createHeaders(),
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error en petición a Supabase:', error);
        throw error;
    }
};

export { SUPABASE_CONFIG, createHeaders, createApiUrl, supabaseRequest };

// Ejemplo de uso:
// supabaseRequest('clientes', 'GET', { select: '*', limit: 100 })
// supabaseRequest('clientes', 'POST', {}, { nombre: 'Juan', email: 'juan@gmail.com' })
