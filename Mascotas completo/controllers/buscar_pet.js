import { petService } from "../service/pet-service.js";

const buscadorInput = document.querySelector("[data-buscador]");
const comboBox = document.querySelector("[data-comboBox]");
const table = document.querySelector("[data-table]");

const limpiarTabla = () => {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
};

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

const cargarPets = (pets) => {
    limpiarTabla();
    pets.forEach(({nombre, especie, edad, fecha_nacimiento, sexo, nombre_dueno, id}) => {
        const nuevaLinea = crear_nueva_fila(nombre, especie, edad, fecha_nacimiento, sexo, nombre_dueno, id);
        table.appendChild(nuevaLinea);
    });
};

const manejarBusqueda = () => {
    const campo = comboBox.value; // 'nombre', 'especie', 'edad', 'fecha_nacimiento', 'sexo' o 'id_dueno'
    const valor = buscadorInput.value.trim();
    
    petService.buscarPets(campo, valor)
        .then(cargarPets)
        .catch(error => {
            console.error("Error al buscar mascotas:", error);
            alert("Ocurrió un error al buscar mascotas");
        });
};

buscadorInput.addEventListener('input', manejarBusqueda);

comboBox.addEventListener('change', () => {

    const input = document.querySelector("[data-buscador]");

    const placeholderMap = {
        'nombre': 'Buscar por nombre de mascota...',
        'especie': 'Buscar por especie...',
        'edad': 'Buscar por edad...',
        'fecha_nacimiento': 'de la fecha que deseas buscar + 1 dia mas',
        'sexo': 'Buscar por sexo (Macho/Hembra)...',
        'id_dueno': 'Buscar por nombre de dueño...'
    };
    buscadorInput.placeholder = placeholderMap[comboBox.value] || 'Buscar...';
    
    if (comboBox.value === 'fecha_nacimiento') {
        input.type = 'date';
        alert("Recuerda que debes ingresar la fecha de nacimiento de la mascota + 1 dia mas para que funcione la busqueda y encuentre la mascota");
    }
    else if (comboBox.value === 'edad') {
        input.type = 'number';
    }
    else{
        input.type = 'text';
    }

    buscadorInput.value = '';
    manejarBusqueda();
});

petService.listaPets()
    .then(cargarPets)
    .catch(error => {
        console.error("Error al cargar mascotas:", error);
        alert("Ocurrió un error al cargar las mascotas");
    });