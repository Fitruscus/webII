import { productService } from "../service/product-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
};

const crear_nueva_fila = (nombre, descripcion, precio, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_producto.html?id=${id}"
                       class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete"
                            type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const id = btn.id;
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            productService.eliminarProducto(id)
                .then(() => alert("Producto eliminado"))
                .catch(error => alert("Error al eliminar"));
        }
    });

    return fila;
};

const cargarProductos = (productos) => {
    limpiarTabla();
    productos.forEach(({nombre, descripcion, precio, id}) => {
        const nuevaLinea = crear_nueva_fila(nombre, descripcion, precio, id);
        table.appendChild(nuevaLinea);
    });
};

const manejarBusqueda = () => {
    const campo = comboBox.value; // 'nombre', 'precio' o 'descripcion'
    const valor = buscadorInput.value.trim();
    
    if (campo === 'precio' && valor && isNaN(valor)) {
        alert("Por favor ingrese un valor numérico para buscar por precio");
        buscadorInput.value = '';
        return;
    }
    
    productService.buscarProductos(campo, valor)
        .then(cargarProductos)
        .catch(error => {
            console.error("Error al buscar productos:", error);
            alert("Ocurrió un error al buscar productos");
        });
};

buscadorInput.addEventListener('input', manejarBusqueda);

comboBox.addEventListener('change', () => {

    const placeholderMap = {
        'nombre': 'Buscar por nombre...',
        'precio': 'Buscar por precio...',
        'descripcion': 'Buscar por descripción...'
    };
    buscadorInput.placeholder = placeholderMap[comboBox.value] || 'Buscar...';
    
    buscadorInput.value = '';
    manejarBusqueda();
});

productService.listaProductos()
    .then(cargarProductos)
    .catch(error => {
        console.error("Error al cargar productos:", error);
        alert("Ocurrió un error al cargar los productos");
    });