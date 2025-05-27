import { boletoService } from '../../service/boleto-service.js';

export class GestorBoletos {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cargarBoletos();
            this.configurarFormulario();
        });
    }

    async cargarBoletos() {
        try {
            const boletos = await boletoService.listarBoletos();
            const tabla = document.querySelector('[data-table]');
            tabla.innerHTML = '';
            
            boletos.forEach(boleto => {
                tabla.appendChild(this.crearFilaBoleto(boleto));
            });
        } catch (error) {
            console.error('Error al cargar boletos:', error);
            alert('Error al cargar los boletos');
        }
    }

    crearFilaBoleto(boleto) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${boleto.sala}</td>
            <td>${boleto.pelicula}</td>
            <td>${boleto.fecha}</td>
            <td>${boleto.hora}</td>
            <td>${boleto.cliente}</td>
            <td>${boleto.cantidad}</td>
            <td>
                <button class="btn-editar" data-id="${boleto.id}" data-action="editar">Editar</button>
                <button class="btn-eliminar" data-id="${boleto.id}" data-action="eliminar">Eliminar</button>
            </td>
        `;

        const btnEliminar = fila.querySelector(".btn-eliminar");
        btnEliminar.addEventListener("click", () => this.eliminarBoleto(boleto.id));

        const btnEditar = fila.querySelector(".btn-editar");
        btnEditar.addEventListener("click", () => this.editarBoleto(boleto.id));

        return fila;
    }

    async eliminarBoleto(id) {
        if (confirm('¿Estás seguro de eliminar este boleto?')) {
            try {
                await boletoService.eliminarBoleto(id);
                alert('Boleto eliminado con éxito');
                this.cargarBoletos();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Error al eliminar el boleto');
            }
        }
    }

    async editarBoleto(id) {
        try {
            const boleto = await boletoService.buscarBoleto(id);
            if (boleto) {
                window.location.href = `editar_boleto.html?id=${id}`;
            }
        } catch (error) {
            console.error('Error al editar:', error);
            alert('Error al obtener el boleto');
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
                        cliente: formulario.elements['cliente'].value,
                        cantidad: formulario.elements['cantidad'].value
                    };

                    await boletoService.crearBoleto(datos);
                    alert('Boleto creado con éxito');
                    this.cargarBoletos();
                    formulario.reset();
                } catch (error) {
                    console.error('Error al crear:', error);
                    alert('Error al crear el boleto');
                }
            });
        }
    }
}
