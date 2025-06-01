import { asignacionService } from '../../service/asignacion-service.js';

export class GestorAsignaciones {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cargarAsignaciones();
            this.configurarFormulario();
        });
    }

    async cargarAsignaciones() {
        try {
            const asignaciones = await asignacionService.listarAsignaciones();
            const tabla = document.querySelector('[data-table]');
            tabla.innerHTML = '';
            
            asignaciones.forEach(asignacion => {
                tabla.appendChild(this.crearFilaAsignacion(asignacion));
            });
        } catch (error) {
            console.error('Error al cargar asignaciones:', error);
            alert('Error al cargar las asignaciones');
        }
    }

    crearFilaAsignacion(asignacion) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${asignacion.sala}</td>
            <td>${asignacion.pelicula}</td>
            <td>${asignacion.fecha}</td>
            <td>${asignacion.hora}</td>
            <td>${asignacion.boletos_disponibles}</td>
            <td>
                <button class="btn-editar" data-id="${asignacion.id}" data-action="editar">Editar</button>
                <button class="btn-eliminar" data-id="${asignacion.id}" data-action="eliminar">Eliminar</button>
            </td>
        `;

        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => this.eliminarAsignacion(asignacion.id));

        const btnEditar = fila.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => this.editarAsignacion(asignacion.id));

        return fila;
    }

    async eliminarAsignacion(id) {
        if (confirm('¿Estás seguro de eliminar esta asignación?')) {
            try {
                await asignacionService.eliminarAsignacion(id);
                alert('Asignación eliminada con éxito');
                this.cargarAsignaciones();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar la asignación');
            }
        }
    }

    async editarAsignacion(id) {
        try {
            const asignacion = await asignacionService.buscarAsignacion(id);
            if (asignacion) {
                window.location.href = `editar_asignacion.html?id=${id}`;
            }
        } catch (error) {
            console.error('Error al editar:', error);
            alert('Error al obtener la asignación');
        }
    }

    configurarFormulario() {
        const formulario = document.querySelector('[data-form]');
        if (formulario) {
            formulario.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const datos = {
                        sala: formulario.elements['sala'].value,
                        pelicula: formulario.elements['pelicula'].value,
                        fecha: formulario.elements['fecha'].value,
                        hora: formulario.elements['hora'].value,
                        boletos_disponibles: formulario.elements['boletos_disponibles'].value
                    };

                    await asignacionService.crearAsignacion(datos);
                    alert('Asignación creada con éxito');
                    this.cargarAsignaciones();
                    formulario.reset();
                } catch (error) {
                    console.error('Error al crear:', error);
                    alert('Error al crear la asignación');
                }
            });
        }
    }
}
