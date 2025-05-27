import { listarFunciones, crearFuncion, listarPeliculas, listarSalas } from '../../config/supabase.js';

class GestorFunciones {
    constructor() {
        this.inicializarEventos();
        this.cargarPeliculas();
        this.cargarSalas();
        this.cargarFunciones();
    }

    async cargarFunciones() {
        try {
            const funciones = await listarFunciones();
            // Agregar relaciones necesarias
            const peliculas = await listarPeliculas();
            const salas = await listarSalas();

            // Combinar datos relacionados
            const funcionesConRelaciones = funciones.map(funcion => {
                const pelicula = peliculas.find(p => p.id === funcion.pelicula_id);
                const sala = salas.find(s => s.id === funcion.sala_id);
                return {
                    ...funcion,
                    peliculas: { titulo: pelicula?.titulo || 'Desconocida' },
                    salas: { nombre: sala?.nombre || 'Desconocida' }
                };
            });

            this.actualizarTabla(funcionesConRelaciones);
        } catch (error) {
            console.error('Error al cargar funciones:', error);
            alert('Error al cargar las funciones');
        }
    }

    async crearFuncion(datos) {
        try {
            await crearFuncion({
                pelicula_id: datos.pelicula_id,
                sala_id: datos.sala_id,
                horario: datos.horario
            });
            this.cargarFunciones();
        } catch (error) {
            console.error('Error al crear función:', error);
            alert(error.message || 'Error al crear la función');
        }
    }

    async actualizarFuncion(id, datos) {
        try {
            await this.servicios.actualizarFuncion(id, datos);
            this.cargarFunciones();
        } catch (error) {
            console.error('Error al actualizar función:', error);
            alert(error.message || 'Error al actualizar la función');
        }
    }

    async eliminarFuncion(id) {
        try {
            await this.servicios.eliminarFuncion(id);
            this.cargarFunciones();
        } catch (error) {
            console.error('Error al eliminar función:', error);
            alert(error.message || 'Error al eliminar la función');
        }
    }

    actualizarTabla(funciones) {
        const tbody = document.querySelector('table[data-table] tbody');
        if (!tbody) return;

        tbody.innerHTML = funciones.map(funcion => `
            <tr>
                <td>${funcion.peliculas.titulo}</td>
                <td>${funcion.salas.nombre}</td>
                <td>${new Date(funcion.horario).toLocaleDateString()}</td>
                <td>${new Date(funcion.horario).toLocaleTimeString()}</td>
                <td>
                    <button class="btn-editar" data-action="editar" data-id="${funcion.id}">Editar</button>
                    <button class="btn-eliminar" data-action="eliminar" data-id="${funcion.id}">Eliminar</button>
                </td>
            </tr>
        `).join('');
    }

    async cargarPeliculas() {
        try {
            const { data, error } = await supabase
                .from('peliculas')
                .select('*');

            if (error) throw error;
            
            const select = document.querySelector('select[name="pelicula_id"]');
            if (select) {
                select.innerHTML = '<option value="">Seleccionar película</option>';
                data.forEach(pelicula => {
                    const option = document.createElement('option');
                    option.value = pelicula.id;
                    option.textContent = pelicula.titulo;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error al cargar películas:', error);
            alert('Error al cargar las películas');
        }
    }

    async cargarSalas() {
        try {
            const { data, error } = await supabase
                .from('salas')
                .select('*');

            if (error) throw error;
            
            const select = document.querySelector('select[name="sala_id"]');
            if (select) {
                select.innerHTML = '<option value="">Seleccionar sala</option>';
                data.forEach(sala => {
                    const option = document.createElement('option');
                    option.value = sala.id;
                    option.textContent = sala.nombre;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error al cargar salas:', error);
            alert('Error al cargar las salas');
        }
    }

    inicializarEventos() {
        const formulario = document.querySelector('form[data-form]');
        if (formulario) {
            formulario.addEventListener('submit', async (e) => {
                e.preventDefault();
                const datos = Object.fromEntries(new FormData(formulario));
                await this.crearFuncion(datos);
            });
        }

        const tabla = document.querySelector('table[data-table]');
        if (tabla) {
            tabla.addEventListener('click', async (e) => {
                const target = e.target;
                const action = target.dataset.action;
                const id = target.dataset.id;

                if (action === 'editar') {
                    // Implementar lógica de edición
                } else if (action === 'eliminar') {
                    if (confirm('¿Estás seguro de eliminar esta función?')) {
                        await this.eliminarFuncion(id);
                    }
                }
            });
        }
    }
}

export { GestorFunciones };
