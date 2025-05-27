import { boletoService } from '../../service/boleto-service.js';

const crearFilaBoleto = ({ sala, pelicula, fecha, hora, cliente, cantidad, id }) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${sala}</td>
        <td>${pelicula}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td>${cliente}</td>
        <td>${cantidad}</td>
        <td>
            <button class="btn-editar" data-id="${id}" data-action="editar">Editar</button>
            <button class="btn-eliminar" data-id="${id}" data-action="eliminar">Eliminar</button>
        </td>
    `;
    
    const btnEliminar = fila.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", async () => {
        const id = btnEliminar.getAttribute('data-id');
        if (confirm(`¿Estás seguro de eliminar este boleto?`)) {
            try {
                await boletoService.eliminarBoleto(id);
                alert("Boleto eliminado con éxito");
                window.location.reload();
            } catch (error) {
                console.error("Error:", error);
                alert("Error al eliminar el boleto: " + error.message);
            }
        }
    });

    const btnEditar = fila.querySelector(".btn-editar");
    btnEditar.addEventListener("click", async () => {
        const id = btnEditar.getAttribute('data-id');
        try {
            const boleto = await boletoService.buscarBoleto(id);
            if (boleto) {
                window.location.href = `editar_boleto.html?id=${id}`;
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al obtener el boleto: " + error.message);
        }
    });

    return fila;
};

const table = document.querySelector("[data-table]");

// Carga inicial directa
boletoService.listarBoletos()
    .then(boletos => {
        boletos.forEach(boleto => {
            table.appendChild(crearFilaBoleto(boleto));
        });
    })
    .catch(error => {
        console.error("Error al cargar boletos:", error);
        alert("Ocurrió un error al cargar los boletos");
    });