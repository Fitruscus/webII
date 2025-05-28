import { petService } from "../service/pet-service.js";

const formulario = document.querySelector("[data-form]");
const duenoSelect = document.querySelector("[data-id-dueno]");

// Cargar clientes al iniciar
const cargarClientes = async () => {
  try {
    const clientes = await petService.obtenerClientes();
    
    // Limpiar select
    duenoSelect.innerHTML = '';
    
    // Agregar opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un dueño';
    duenoSelect.appendChild(defaultOption);
    
    // Validar si hay clientes
    if (clientes.length === 0) {
      const noClientesOption = document.createElement('option');
      noClientesOption.value = '';
      noClientesOption.textContent = 'No hay clientes registrados';
      noClientesOption.disabled = true;
      duenoSelect.appendChild(noClientesOption);
      return;
    }
    
    // Agregar clientes al select
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = `${cliente.nombre} (${cliente.email})`;
      duenoSelect.appendChild(option);
    });
    
  } catch (error) {
    console.error("Error al cargar clientes:", error);
    duenoSelect.innerHTML = '<option value="">Error al cargar clientes</option>';
  }
};

const obtenerInfo = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id === null) {
    window.location.href = "../screens/error.html";
  }

  // Cargar clientes primero
  await cargarClientes();

  const nombreInput = document.querySelector("[data-nombre]");
  const especieInput = document.querySelector("[data-especie]");
  const edadInput = document.querySelector("[data-edad]");
  const fechaNacimientoInput = document.querySelector("[data-fecha-nacimiento]");
  const sexoInputs = document.querySelectorAll("[data-sexo]");

  try {
    const pet = await petService.detallePet(id);
    
    if (!pet || !pet.nombre || !pet.especie || !pet.edad || !pet.fecha_nacimiento || !pet.sexo) {
      throw new Error("Datos incompletos de la mascota");
    }

    nombreInput.value = pet.nombre;
    especieInput.value = pet.especie;
    edadInput.value = pet.edad;
    fechaNacimientoInput.value = pet.fecha_nacimiento.split('T')[0];
    
    // Seleccionar el sexo correcto
    sexoInputs.forEach(input => {
      if (input.value === pet.sexo) {
        input.checked = true;
      }
    });
    
    // Seleccionar el dueño si existe
    if (pet.id_dueno) {
      duenoSelect.value = pet.id_dueno;
    }
  } catch (error) {
    console.error("Error al cargar mascota:", error);
    window.location.href = "../screens/error_pet.html";
  }
};

obtenerInfo();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const especie = document.querySelector("[data-especie]").value;
  const edad = document.querySelector("[data-edad]").value;
  const fecha_nacimiento = document.querySelector("[data-fecha-nacimiento]").value;
  const sexo = document.querySelector("[data-sexo]:checked").value;
  const id_dueno = document.querySelector("[data-id-dueno]").value;

  // Validar que se haya seleccionado un dueño
  if (!id_dueno) {
    alert("Debe seleccionar un dueño para la mascota");
    return;
  }

  petService.actualizarPet(nombre, especie, edad, fecha_nacimiento, sexo, id_dueno, id)
    .then(() => {
      window.location.href = "../screens/edicion_concluida_pet.html";
    })
    .catch(error => {
      console.error("Error al actualizar:", error);
      alert(error.message);
    });
});