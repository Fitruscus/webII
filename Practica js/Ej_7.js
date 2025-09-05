const datos = [
    { materia: 'Programacion Web I', calificacion: 99 },
    { materia: 'Base de Datos I', calificacion: 99 },
    { materia: 'Programacion II', calificacion: 97 },
    { materia: 'Ingles II', calificacion: 97 },
    { materia: 'Programacion Web II', calificacion: 100 },
    { materia: 'Base de Datos II', calificacion: 100 },
    { materia: 'Programacion III', calificacion: 100 },
    { materia: 'Ingles III', calificacion: 100 },
    { materia: 'Sistemas Operativos', calificacion: 95 },
    { materia: 'Programacion Movil I', calificacion: 100 }
];

let suma = datos.reduce((total, obj) => total + obj.calificacion, 0);

console.log("La suma de las calificaciones es:", suma);
