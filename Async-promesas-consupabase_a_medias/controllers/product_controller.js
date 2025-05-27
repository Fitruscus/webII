import { productService } from "../service/product-service.js";

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
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }
    productService.eliminarProducto(id)
      .then(respuesta => alert("Producto eliminado"))
      .catch(error => alert("Error al eliminar"));
  });

  return fila;
};

const table = document.querySelector("[data-table]");

productService.listaProductos()
  .then((data) => {
    data.forEach(({nombre, descripcion, precio, id}) => {
      const nuevaLinea = crear_nueva_fila(nombre, descripcion, precio, id);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => alert("Ocurrió un error al cargar los productos"));