import { salaService } from '../../service/sala-service.js';

export class GestorSalas {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cargarSalas();
            this.configurarFormulario();
        });
    }

    async cargarSalas() {
        try {
            const salas = await salaService.listarSalas();
            const tabla = document.querySelector('[data-table]');
            tabla.innerHTML = '';
            
            salas.forEach(sala => {
                tabla.appendChild(this.crearFilaSala(sala));
            });
        } catch (error) {
            console.error('Error al cargar salas:', error);
            alert('Error al cargar las salas');
        }
    }

    crearFilaSala(sala) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${sala.nombre}</td>
            <td>${sala.capacidad}</td>
            <td>
                <button class="btn-editar" data-id="${sala.id}" data-action="editar">Editar</button>
                <button class="btn-eliminar" data-id="${sala.id}" data-action="eliminar">Eliminar</button>
            </td>
        `;

        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => this.eliminarSala(sala.id));

        const btnEditar = fila.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => this.editarSala(sala.id));

        return fila;
    }

    async eliminarSala(id) {
        if (confirm('¿Estás seguro de eliminar esta sala?')) {
            try {
                await salaService.eliminarSala(id);
                alert('Sala eliminada con éxito');
                this.cargarSalas();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar la sala');
            }
        }
    }

    async editarSala(id) {
        try {
            const sala = await salaService.buscarSala(id);
            if (sala) {
                window.location.href = `editar_sala.html?id=${id}`;
            }
        } catch (error) {
            console.error('Error al editar:', error);
            alert('Error al obtener la sala');
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
                        capacidad: formulario.elements['capacidad'].value
                    };

                    await salaService.crearSala(datos);
                    alert('Sala creada con éxito');
                    this.cargarSalas();
                    formulario.reset();
                } catch (error) {
                    console.error('Error al crear:', error);
                    alert('Error al crear la sala');
                }
            });
        }
    }
}
