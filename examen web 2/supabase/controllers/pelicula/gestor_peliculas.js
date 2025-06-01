import { peliculaService } from '../../service/pelicula-service.js';

export class GestorPeliculas {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cargarPeliculas();
            this.configurarFormulario();
        });
    }

    async cargarPeliculas() {
        try {
            const peliculas = await peliculaService.listarPeliculas();
            const tabla = document.querySelector('[data-table]');
            tabla.innerHTML = '';
            
            peliculas.forEach(pelicula => {
                tabla.appendChild(this.crearFilaPelicula(pelicula));
            });
        } catch (error) {
            console.error('Error al cargar películas:', error);
            alert('Error al cargar las películas');
        }
    }

    crearFilaPelicula(pelicula) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${pelicula.nombre}</td>
            <td>${pelicula.duracion} min</td>
            <td>
                <button class="btn-editar" data-id="${pelicula.id}" data-action="editar">Editar</button>
                <button class="btn-eliminar" data-id="${pelicula.id}" data-action="eliminar">Eliminar</button>
            </td>
        `;

        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => this.eliminarPelicula(pelicula.id));

        const btnEditar = fila.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => this.editarPelicula(pelicula.id));

        return fila;
    }

    async eliminarPelicula(id) {
        if (confirm('¿Estás seguro de eliminar esta película?')) {
            try {
                await peliculaService.eliminarPelicula(id);
                alert('Película eliminada con éxito');
                this.cargarPeliculas();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar la película');
            }
        }
    }

    async editarPelicula(id) {
        try {
            const pelicula = await peliculaService.buscarPelicula(id);
            if (pelicula) {
                window.location.href = `editar_pelicula.html?id=${id}`;
            }
        } catch (error) {
            console.error('Error al editar:', error);
            alert('Error al obtener la película');
        }
    }

    configurarFormulario() {
        const formulario = document.querySelector('[data-form]');
        if (formulario) {
            formulario.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const datos = {
                        nombre: formulario.elements['nombre'].value,
                        duracion: formulario.elements['duracion'].value
                    };

                    await peliculaService.crearPelicula(datos);
                    alert('Película creada con éxito');
                    this.cargarPeliculas();
                    formulario.reset();
                } catch (error) {
                    console.error('Error al crear:', error);
                    alert('Error al crear la película');
                }
            });
        }
    }
}
