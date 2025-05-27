class ApiService {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    // Métodos para clientes
    async getClientes() {
        try {
            const response = await fetch(`${this.baseUrl}/clientes`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
    }

    async addCliente(cliente) {
        try {
            const response = await fetch(`${this.baseUrl}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            throw error;
        }
    }

    async updateCliente(id, cliente) {
        try {
            const response = await fetch(`${this.baseUrl}/clientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            });
            
            if (!response.ok) {
                throw new Error(`Error al actualizar cliente: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error detallado al actualizar cliente:', error);
            throw new Error(`Error al actualizar cliente: ${error.message}`);
        }
    }

    async deleteCliente(id) {
        try {
            const response = await fetch(`${this.baseUrl}/clientes/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Error al eliminar cliente: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error detallado al eliminar cliente:', error);
            throw new Error(`Error al eliminar cliente: ${error.message}`);
        }
    }

    // Métodos para salas
    async getSalas() {
        try {
            const response = await fetch(`${this.baseUrl}/salas`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener salas:', error);
            throw error;
        }
    }

    // Métodos para películas
    async getPeliculas() {
        try {
            const response = await fetch(`${this.baseUrl}/peliculas`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener películas:', error);
            throw error;
        }
    }

    // Métodos para funciones
    async getFunciones() {
        try {
            const response = await fetch(`${this.baseUrl}/funciones`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener funciones:', error);
            throw error;
        }
    }

    // Métodos para boletos
    async getBoletos() {
        try {
            const response = await fetch(`${this.baseUrl}/boletos`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener boletos:', error);
            throw error;
        }
    }

    // Métodos para asignaciones
    async getAsignaciones() {
        try {
            const response = await fetch(`${this.baseUrl}/asignacion`);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener asignaciones:', error);
            throw error;
        }
    }
}

// Exportar una instancia única del servicio
export const apiService = new ApiService();
