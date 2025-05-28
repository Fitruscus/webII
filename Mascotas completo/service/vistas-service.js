import { clientService } from "./client-service.js";
import { petService } from "./pet-service.js";

const obtenerClientesConMascotas = async () => {
    try {
        const clientes = await clientService.listaclientes();
        
        const mascotas = await petService.listaPets();
        
        /* EXPLICACION DE LA FUNCION MAP()
        
        - Supongamos que tenemos un array de números y queremos elevar cada número al cuadrado.
        - Usamos el método map() para crear un nuevo array con los resultados.
        - El método map() toma una función como argumento, que se aplica a cada elemento del array original.
        - La función map() devuelve un nuevo array con los resultados de aplicar la función a cada elemento.
        - Por ejemplo, si tenemos un array [1, 2, 3, 4], y queremos elevar cada número al cuadrado,
        - podemos usar map() de la siguiente manera:

        const numeros = [1, 2, 3, 4];
        const alCuadrado = numeros.map(n => n * n); // aca n es el elemento del array
        // alCuadrado es un nuevo array que contiene [1, 4, 9, 16]
        console.log(alCuadrado); // [1, 4, 9, 16]

        */ 

        const clientesConMascotas = clientes.map(cliente => {
            // Filtramos las mascotas que pertenecen al cliente actual
            const mascotasCliente = mascotas.filter(mascota => mascota.id_dueno === cliente.id); // filter para quedarnos con las mascotas que tienen el mismo id de dueño que el cliente actual
            return { // devolvemos un nuevo objeto con la cantidad de mascotas por cliente
                ...cliente,
                cantidadMascotas: mascotasCliente.length
            };

            /*
            en este caso el objeto cliente es un objeto que contiene la info de un cliente
            cada cliente tiene un id, nombre, email y (cantidad de mascotas[fue lo extra que agregamos]) 
            {
                id: "1",
                nombre: "Juan",
                email: "juan@email.com",
                cantidadMascotas: 3
            }

            */
        });
        
        return clientesConMascotas;
    } catch (error) {
        console.error("Error al obtener clientes con mascotas:", error);
        throw error;
    }
};

const buscarClientesConMascotas = async (campo, valor) => {
    try {
        const clientesConMascotas = await obtenerClientesConMascotas();
        
        if (!valor || valor.trim() === '') {
            return clientesConMascotas;
        }
        
        return clientesConMascotas.filter(cliente => 
            cliente[campo].toLowerCase().includes(valor.toLowerCase())
            /*
            EXPLICACION DE LA FUNCION INCLUDES()
            - La función includes() se utiliza para verificar si un array o una cadena de texto contiene un valor específico.

            array.includes(valor); // true o false
            string.includes(subtexto); // true o false
            */
        );
    } catch (error) {
        console.error("Error al buscar clientes:", error);
        throw error;
    }
};

export const vistasService = {
    obtenerClientesConMascotas,
    buscarClientesConMascotas
};