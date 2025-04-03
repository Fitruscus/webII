const API_URL='http://localhost:3000/posts'; // se recupera despues de ejecutar este comando en la terminal
// Esto es para realizar conexion con el servidor
const getData =()=>{
    fetch(API_URL)
        .then(response =>{
            // Si hay un error va a informar
            if(!response.ok){
                throw new Error(`error en la peticion get del estado es: ${response.status}`);
            }
            return response.json()
        })
        .then(data => showResult(data))
        .catch(error => showResult(error.message, true));
};