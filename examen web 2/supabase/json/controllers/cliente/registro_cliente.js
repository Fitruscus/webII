import { clienteService } from "../../service/cliente-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    const ci = document.querySelector("[data-ci]").value.trim();
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const apellido = document.querySelector("[data-apellido]").value.trim();
    const telefono = document.querySelector("[data-telefono]").value.trim();

    try {
        // Verificar si el CI ya existe
        const clienteExistente = await clienteService.buscarClientePorCI(ci);
        if (clienteExistente) {
            throw new Error("El CI ya está registrado");
        }

        // Crear nuevo cliente
        await clienteService.crearCliente(ci, nombre, apellido, telefono);
        
        alert("Cliente registrado con éxito");
        window.location.href = "../screens/clientes.html";
    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error al registrar cliente: " + error.message);
    }
});