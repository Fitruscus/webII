import { clienteService } from '../../service/cliente-service.js';

export class GestorClientes {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cargarClientes();
            this.configurarFormulario();
        });
    }

    async cargarClientes() {
        try {
            const clientes = await clienteService.listarClientes();
            const tabla = document.querySelector('[data-table]');
            tabla.innerHTML = '';
            
            clientes.forEach(cliente => {
                tabla.appendChild(this.crearFilaCliente(cliente));
            });
        } catch (error) {
            console.error('Error al cargar clientes:', error);
            alert('Error al cargar los clientes');
        }
    }

    crearFilaCliente(cliente) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.ci}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.email}</td>
            <td>
                <button class="btn-editar" data-id="${cliente.id}" data-action="editar">Editar</button>
                <button class="btn-eliminar" data-id="${cliente.id}" data-action="eliminar">Eliminar</button>
            </td>
        `;

        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => this.eliminarCliente(cliente.id));

        const btnEditar = fila.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => this.editarCliente(cliente.id));

        return fila;
    }

    async eliminarCliente(id) {
        if (confirm('¿Estás seguro de eliminar este cliente?')) {
            try {
                await clienteService.eliminarCliente(id);
                alert('Cliente eliminado con éxito');
                this.cargarClientes();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar el cliente');
            }
        }
    }

    async editarCliente(id) {
        try {
            const cliente = await clienteService.buscarCliente(id);
            if (cliente) {
                window.location.href = `editar_cliente.html?id=${id}`;
            }
        } catch (error) {
            console.error('Error al editar:', error);
            alert('Error al obtener el cliente');
        }
    }

    configurarFormulario() {
        const formulario = document.querySelector('[data-form]');
        if (formulario) {
            formulario.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const datos = {
                        ci: formulario.elements['ci'].value,
                        nombre: formulario.elements['nombre'].value,
                        apellido: formulario.elements['apellido'].value,
                        telefono: formulario.elements['telefono'].value,
                        email: formulario.elements['email'].value
                    };

                    await clienteService.crearCliente(datos);
                    alert('Cliente creado con éxito');
                    this.cargarClientes();
                    formulario.reset();
                } catch (error) {
                    console.error('Error al crear:', error);
                    alert('Error al crear el cliente');
                }
            });
        }
    }
}
