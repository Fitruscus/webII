// Servicios centralizados para manejo de datos

const BASE_PATH = '../Base de datos/';

const guardarDatos = async (archivo, datos) => {
    try {
        const response = await fetch(BASE_PATH + archivo, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            throw new Error(`Error al guardar datos: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Error al guardar datos:', error);
        throw error;
    }
};

const cargarDatos = async (archivo) => {
    try {
        const response = await fetch(BASE_PATH + archivo);
        if (!response.ok) {
            throw new Error(`Error al cargar datos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        throw error;
    }
};

const generarId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Funciones
const ARCHIVO_FUNCIONES = 'funciones.json';

export const listarFunciones = async () => {
    try {
        return await cargarDatos(ARCHIVO_FUNCIONES);
    } catch (error) {
        console.error('Error en listarFunciones:', error);
        throw error;
    }
};

export const buscarFuncion = async (id) => {
    try {
        const funciones = await cargarDatos(ARCHIVO_FUNCIONES);
        return funciones.find(funcion => funcion.id === id) || null;
    } catch (error) {
        console.error('Error en buscarFuncion:', error);
        throw error;
    }
};

export const crearFuncion = async (datosFuncion) => {
    try {
        const funciones = await cargarDatos(ARCHIVO_FUNCIONES);
        const nuevaFuncion = {
            id: generarId(),
            ...datosFuncion,
            fecha_creacion: new Date().toISOString(),
            estado: 'Programada'
        };

        // Verificar disponibilidad de la sala
        const sala = await cargarDatos('salas.json');
        const salaEncontrada = sala.find(s => s.nombre === datosFuncion.sala);
        if (!salaEncontrada) {
            throw new Error('Sala no encontrada');
        }

        // Verificar disponibilidad del horario
        const funcionesExistentes = funciones.filter(f => 
            f.sala === datosFuncion.sala &&
            f.fecha === datosFuncion.fecha &&
            f.hora === datosFuncion.hora
        );

        if (funcionesExistentes.length > 0) {
            throw new Error('Esta sala ya tiene una función programada en ese horario');
        }

        funciones.push(nuevaFuncion);
        await guardarDatos(ARCHIVO_FUNCIONES, funciones);
        return nuevaFuncion;
    } catch (error) {
        console.error('Error en crearFuncion:', error);
        throw error;
    }
};

export const actualizarFuncion = async (id, datosFuncion) => {
    try {
        const funciones = await cargarDatos(ARCHIVO_FUNCIONES);
        const indice = funciones.findIndex(funcion => funcion.id === id);
        
        if (indice === -1) throw new Error('Función no encontrada');

        // Verificar si se está modificando el horario
        if (datosFuncion.hora || datosFuncion.fecha) {
            const funcionesExistentes = funciones.filter(f => 
                f.sala === datosFuncion.sala &&
                f.fecha === datosFuncion.fecha &&
                f.hora === datosFuncion.hora &&
                f.id !== id
            );

            if (funcionesExistentes.length > 0) {
                throw new Error('Esta sala ya tiene una función programada en ese horario');
            }
        }

        funciones[indice] = { ...funciones[indice], ...datosFuncion };
        await guardarDatos(ARCHIVO_FUNCIONES, funciones);
        return funciones[indice];
    } catch (error) {
        console.error('Error en actualizarFuncion:', error);
        throw error;
    }
};

export const eliminarFuncion = async (id) => {
    try {
        const funciones = await cargarDatos(ARCHIVO_FUNCIONES);
        const indice = funciones.findIndex(funcion => funcion.id === id);
        
        if (indice === -1) throw new Error('Función no encontrada');

        // Verificar si hay boletos vendidos para esta función
        const boletos = await cargarDatos('boletos.json');
        const tieneBoletos = boletos.some(boleto => 
            boleto.sala === funciones[indice].sala &&
            boleto.fecha === funciones[indice].fecha &&
            boleto.hora === funciones[indice].hora
        );

        if (tieneBoletos) {
            throw new Error('No se puede eliminar la función porque hay boletos vendidos');
        }

        funciones.splice(indice, 1);
        await guardarDatos(ARCHIVO_FUNCIONES, funciones);
        return true;
    } catch (error) {
        console.error('Error en eliminarFuncion:', error);
        throw error;
    }
};

// Exportar funciones base
export { guardarDatos, cargarDatos, generarId };
