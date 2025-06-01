const generarNuevoId = () => {
  let siguienteId = localStorage.getItem('lastPostId');
  if (!siguienteId || isNaN(siguienteId)) {
      siguienteId = 1;
  } else {
      siguienteId = parseInt(siguienteId) + 1;
  }
  localStorage.setItem('lastPostId', siguienteId.toString());
  return siguienteId.toString();
};


let API_URL = "http://localhost:3000/posts";

const setApiUrl = (url) => {
    API_URL = url;
};

const postData = () => {
  const taskInput = document.querySelector('[data-input-task]');
  const descInput = document.querySelector('[data-input-descripcion]');
  const dateInput = document.querySelector('[data-input-fecha]');
  const priorInput = document.querySelector('[data-input-prioridad]');
  const enteroInput = document.querySelector('[data-input-entero]');

  if (!taskInput.value || !descInput.value || !dateInput.value) {
      showResult("Faltan campos obligatorios", true);
      return;
  }

  const newPost = {
      id: generarNuevoId(), 
      titulo: taskInput.value,
      descripcion: descInput.value,
      fecha: dateInput.value || new Date().toISOString(), 
      nombre: priorInput.value || "Sin prioridad",
      valorEntero: parseInt(enteroInput.value) || 0 
  };

  fetch(API_URL || "http://localhost:3000/posts", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(newPost)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      showResult(data);
  })
  .catch(error => showResult(error.message, true));
};
