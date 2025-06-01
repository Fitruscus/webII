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
    defaultOption.disabled = true;
    defaultOption.selected = true;
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
    duenoSelect.innerHTML = '<option value="" disabled selected>Error al cargar clientes</option>';
  }
};

cargarClientes();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
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

  petService.crearPet(nombre, especie, edad, fecha_nacimiento, sexo, id_dueno)
    .then(() => {
      window.location.href = "/Async-promesas-supabaseCompleto/screens/registro_completado_pet.html";
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });
});
