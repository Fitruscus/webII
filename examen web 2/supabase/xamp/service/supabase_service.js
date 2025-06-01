import { supabase } from '../config/supabase.js';

export const listarClientes = async () => {
    try {
        const { data, error } = await supabase
            .from('clientes')
            .select('*');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al listar clientes:', error);
        throw error;
    }
};

export const crearCliente = async (datos) => {
    try {
        const { data, error } = await supabase
            .from('clientes')
            .insert([
                {
                    nombre: datos.nombre,
                    email: datos.email,
                    telefono: datos.telefono
                }
            ])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    }
};

export const actualizarCliente = async (id, datos) => {
    try {
        const { data, error } = await supabase
            .from('clientes')
            .update({
                nombre: datos.nombre,
                email: datos.email,
                telefono: datos.telefono
            })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        throw error;
    }
};

export const eliminarCliente = async (id) => {
    try {
        const { error } = await supabase
            .from('clientes')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw error;
    }
};

// Similar para las otras entidades
export const listarPeliculas = async () => {
    try {
        const { data, error } = await supabase
            .from('peliculas')
            .select('*');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al listar películas:', error);
        throw error;
    }
};

export const listarSalas = async () => {
    try {
        const { data, error } = await supabase
            .from('salas')
            .select('*');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al listar salas:', error);
        throw error;
    }
};

export const listarFunciones = async () => {
    try {
        const { data, error } = await supabase
            .from('funciones')
            .select(`
                *,
                peliculas (titulo),
                salas (nombre)
            `)
            .order('horario', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al listar funciones:', error);
        throw error;
    }
};

export const crearFuncion = async (datos) => {
    try {
        const { data, error } = await supabase
            .from('funciones')
            .insert([
                {
                    pelicula_id: datos.pelicula_id,
                    sala_id: datos.sala_id,
                    horario: datos.horario
                }
            ])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error al crear función:', error);
        throw error;
    }
};

export const listarBoletos = async () => {
    try {
        const { data, error } = await supabase
            .from('boletos')
            .select(`
                *,
                funciones (horario),
                clientes (nombre)
            `)
            .order('id', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al listar boletos:', error);
        throw error;
    }
};
