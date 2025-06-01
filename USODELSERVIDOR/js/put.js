const putData = (id) => {
    const update = {
        titulo: "Actualizado",
        descripcion: "actualizado",
        fecha: new Date().toISOString(),
        nombre: "actualizado",
        valorEntero: 212
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(update)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const fila = document.querySelector(`tr[data-id="${id}"]`);
        if (fila) {
            fila.cells[1].textContent = data.titulo;
            fila.cells[2].textContent = data.descripcion;
            fila.cells[3].textContent = data.fecha;
            fila.cells[4].textContent = data.nombre;      
            fila.cells[5].textContent = data.valorEntero; 
        }
        showResult(data);
    })
    .catch(error => showResult(error.message, true));
};
