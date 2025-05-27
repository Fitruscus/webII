import { clienteService } from "../../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfoCliente = () => {
    const url = new URL(window.location);
    const ci = url.searchParams.get("ci");
    
    if (!ci) {
        alert("No se encontró el CI del cliente");
        window.location.href = "../screens/clientes.html";
        return;
    }

    clienteService.buscarClientePorCI(ci)
        .then(cliente => {
            if (!cliente) {
                throw new Error("Cliente no encontrado");
            }

            document.querySelector("[data-ci]").value = cliente.ci;
            document.querySelector("[data-nombre]").value = cliente.nombre;
            document.querySelector("[data-apellido]").value = cliente.apellido;
            document.querySelector("[data-telefono]").value = cliente.telefono;
        })
        .catch(error => {
            console.error("Error al cargar cliente:", error);
            alert("Error al cargar datos del cliente");
            window.location.href = "../screens/clientes.html";
        });
};

obtenerInfoCliente();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const ci = document.querySelector("[data-ci]").value;
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const apellido = document.querySelector("[data-apellido]").value.trim();
    const telefono = document.querySelector("[data-telefono]").value.trim();

    clienteService.actualizarCliente(ci, nombre, apellido, telefono)
        .then(() => {
            alert("Cliente actualizado con éxito");
            window.location.href = "../screens/clientes.html";
        })
        .catch(error => {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar cliente: " + error.message);
        });
});