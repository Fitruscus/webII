// Se crea una constante para insertar o crear este objeto en la base de datos
const postData =()=>{
    const newPost={
        titulo: "Nuevo Post",
        descripcion: "Nueva descripcion",
        fecha: new Date().toISOString()
    };
    // fetch solo abre en ese momento, despues de esa opcion se cierra
    fetch(API_URL,{
        // Todos los method en MAYUSCULA
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        // Cuerpo es Igual a un json
        body: JSON.stringify(newPost)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error(`ERROR EN LA RESPUESTA estado:${response.status}`)
        }
        return response.json();
    }).then(data => showResult(data))
    .catch(error => showResult(error.message, true));
};