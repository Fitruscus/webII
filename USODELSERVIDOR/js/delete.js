const deleteData = (id) => {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`);
        }
        
        const fila = document.querySelector(`tr[data-id="${id}"]`);
        if (fila) fila.remove();
        
        showResult({
            message: `El post con id ${id} fue eliminado`,
            status: response.status
        });
    })
    .catch(error => showResult(error.message, true));
};
