const Form = (() => {
    const form = document.querySelector('[data-form]');
    const inputTask = document.querySelector('[data-input-task]');
    const inputDescription = document.querySelector('[data-input-descripcion]');
    const date = document.querySelector('[data-input-fecha]');
    const inputPrioridad = document.querySelector('[data-input-prioridad]');
    const inputEntero = document.querySelector('[data-input-entero]');
 
    const datosForm = () => ({
        task: inputTask.value.trim(),
        description: inputDescription.value.trim(),
        date: date.value.trim(),
        priority: inputPrioridad.value.trim(),
        entero: inputEntero.value.trim()
    });

    const reset = () => {
        form.reset();
    };

    const setDatos = (callback) => {
        form.addEventListener('submit', (evento) => {
            evento.preventDefault();
            callback(datosForm());
            reset();
        });
    };

    return { setDatos };
})();

export default Form;