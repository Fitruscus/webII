// Servicio base para manejar datos locales usando archivos JSON

const BASE_PATH = '../Base de datos/';

const guardarDatos = async (archivo, datos) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const ruta = path.join(BASE_PATH, archivo);
        await fs.promises.writeFile(ruta, JSON.stringify(datos, null, 2));
        return true;
    } catch (error) {
        console.error('Error al guardar datos:', error);
        throw error;
    }
};

const cargarDatos = async (archivo) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const ruta = path.join(BASE_PATH, archivo);
        const datos = await fs.promises.readFile(ruta, 'utf-8');
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        throw error;
    }
};

const generarId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export { guardarDatos, cargarDatos, generarId };
