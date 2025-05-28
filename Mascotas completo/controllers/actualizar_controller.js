import { clientService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]")

//----------------- Nuevo Obtener Info ------------- con async
const obtenerInfo= async()=>{//estructura async
    const url=new URL(window.location);// nueva url
    const id= (url.searchParams.get("id"));// url con identificador
    if(id==null){
        // alert("No se ha podido recuperar el id del cliente");
        window.location.href="../screen/error.html"// si no recupera el id pues error 
    }
    const nombre = document.querySelector("[data-nombre]")//recuperamos datos
    const email = document.querySelector("[data-email]")
    try {
        const perfilResponse = await clientService.clientes(id);

        // Supabase devuelve un array, tomamos el primer elemento (si existe)
        const perfil = Array.isArray(perfilResponse) && perfilResponse.length > 0 ? perfilResponse[0] : perfilResponse;

        if (!perfil || !perfil.nombre || !perfil.email) {
            throw new Error("Cliente no encontrado o datos incompletos");
        }

        // Asignar los valores a los campos del formulario
        nombre.value = perfil.nombre;
        email.value = perfil.email;
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();
//-----------------------------------------
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get("id"));

    const nombre= document.querySelector('[data-nombre]').value;
    const email= document.querySelector('[data-email]').value;
    clientService.actualizarCliente(nombre,email,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})