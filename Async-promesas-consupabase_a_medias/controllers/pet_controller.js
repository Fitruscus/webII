import { petService } from "../service/pet-service.js";

const crear_nueva_fila = (nombre, especie, edad, fecha_nacimiento, sexo, nombre_dueno, id) => {
  const fila = document.createElement('tr');
  const contenido = `
    <td class="td" data-td>${nombre}</td>
    <td>${especie}</td>
    <td>${edad}</td>
    <td>${new Date(fecha_nacimiento).toLocaleDateString()}</td>
    <td>${sexo === 'macho' ? 'Macho' : 'Hembra'}</td>
    <td>${nombre_dueno || 'Sin dueño'}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a href="../screens/editar_pet.html?id=${id}"
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
    if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      petService.eliminarPet(id)
        .then(() => alert("Mascota eliminada"))
        .catch(error => alert("Error al eliminar"));
    }
  });

  return fila;
};

const table = document.querySelector("[data-table]");

petService.listaPets()
  .then((data) => {
    data.forEach(({nombre, especie, edad, fecha_nacimiento, sexo, nombre_dueno, id}) => {
      const nuevaLinea = crear_nueva_fila(nombre, especie, edad, fecha_nacimiento, sexo, nombre_dueno, id);
      table.appendChild(nuevaLinea);
    });
  })
  .catch((error) => {
    console.error("Error al cargar mascotas:", error);
    alert("Ocurrió un error al cargar las mascotas");
  });