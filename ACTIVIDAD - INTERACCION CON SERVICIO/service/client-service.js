const API_BASE_URL = 'http://localhost/api/clientes';
const listaclientes = () => {
  return fetch(API_BASE_URL)
  .then(response => {
    if (!response.ok) throw new Error('error clientes');
    return response.json();
  })
}

const crearCliente = (nombre, email) => {
  return fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    //Le damos un identificador 
    body:JSON.stringify({nombre, email, id: uuid.v4()})
  }).then(response => {
    if (!response.ok) throw new Error('error al crear cliente');
    return response.json();
  })
};

const eliminarCliente = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {
      location.reload();
    } else {
      console.error("Error al eliminar el cliente");
    }
  })
  .catch(error => {
    console.error("Error de conexionsita:", error);
  });
};


const clientes = (id) => {
  return fetch(`${API_BASE_URL}?id=${id}`).then((respuesta) => respuesta.json())
};

const actualizarCliente = (nombre, email, id) => {
  return fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({nombre, email, id})
  }).then(respuesta => console.log(respuesta)).catch((err) => console.log(err))
};

export const clientService = {
  listaclientes,
  crearCliente,
  eliminarCliente,
  clientes,
  actualizarCliente
};