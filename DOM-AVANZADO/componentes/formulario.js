const Form = (()=>{
    // Recuperando los data del formulario 
    const form = document.querySelector('[data-form]');
    const inputTask = document.querySelector('[data-input-task]');
    const inputDescription = document.querySelector('[data-input-descripcion]');
    const date = document.querySelector('[data-input-fecha]');
    const inputPrioridad =document.querySelector('[data-input-prioridad]');

    // FUncion que guarda los datos como objetos en un array sin nombre mediante el return
    const datosForm = ()=>{
        return {
            task: inputTask.value.trim(),
            description: inputDescription.value.trim(),
            date: date.value.trim(),
            priority: inputPrioridad.value.trim(),
        };
    };

    // Funcion para vaciar el formulario
    const reset = ()=>{
        inputTask.value = '';
        inputDescription.value = '';
        date.value = '';
        inputPrioridad.value = '';
    };

    // Devuelvo los daros para usarlos en la tabla
    const setDatos = (callback)=>{
        form.addEventListener('submit', (evento)=>{
            // que funcuione como yo quiero primero
            evento.preventDefault();
            // va a devolver los datos de datos form
            callback(datosForm());
            // vaciar los valores del formulario
            reset();

        });
    }

    return{setDatos};
})();

export default Form;