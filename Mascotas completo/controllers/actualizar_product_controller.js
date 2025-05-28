import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "../screens/error.html";
    }

    const nombreInput = document.querySelector("[data-nombre]");
    const precioInput = document.querySelector("[data-precio]");
    const descripcionInput = document.querySelector("[data-descripcion]");

    try {
        const productoResponse = await productService.detalleProducto(id);
        
        // Supabase devuelve un array, tomamos el primer elemento
        const producto = Array.isArray(productoResponse) && productoResponse.length > 0 ? productoResponse[0] : productoResponse;

        if (!producto || !producto.nombre || !producto.precio || !producto.descripcion) {
            throw new Error("Producto no encontrado o datos incompletos");
        }

        nombreInput.value = producto.nombre;
        precioInput.value = producto.precio;
        descripcionInput.value = producto.descripcion;
    } catch (error) {
        console.error("Error al cargar producto:", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    productService.actualizarProducto(nombre, precio, descripcion, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida_product.html";
        })
        .catch(error => {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar el producto");
        });
});