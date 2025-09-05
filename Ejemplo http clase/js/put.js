const putData = ()=>{
    const update = {
        titulo:"Actualizado",
        descripcion:"actualizado",
        fecha: new Date().toISOString()
    };
    // estamos llamando al identificador 1
    fetch(`${API_URL}/1`, {
        method:"PUT",
        headers:{
            "Content-Type": "aplication/json",
            "Accept": "aplication/json"
        },
        body:JSON.stringify(update)
    })
    // Pregunta y respuesta que estamos solicitando
    .then(response =>{
        if(!response.ok){
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`)
        }
        return response.json();
    }).then(data => showResult(data))
    .catch(error => showResult(error.message, true));
};