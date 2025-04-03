const datos = [
    {
        'materia':'Programacion Web I',
        'calificacion': 99
    },
    {
        'materia':'Base de Datos I',
        'calificacion': 99
    },
    {
        'materia':'Programacion II',
        'calificacion': 97
    },
    {
        'materia':'Ingles II',
        'calificacion': 97
    },
    {
        'materia':'Programacion Web II',
        'calificacion': 100
    },
    {
        'materia':'Base de Datos II',
        'calificacion': 100 
    },
    {
        'materia':'Programacion III',
        'calificacion': 100
    },
    {
        'materia':'Ingles III',
        'calificacion': 100 
    },
    {
        'materia':'Sistemas Operativos',
        'calificacion': 95
    },
    {
        'materia':'Programacion Movil I',
        'calificacion': 100
    }
];

let materiaSeleccionada = '';
const NotaAprobacion = 51;

for (let i = 0; i < datos.length && notaAprobacion == ''; i++) {
    if (datos[i].calificacion <= notaAprobacion) {
        materiaSeleccionada = datos[i].materia;
    }
}

if (materiaSeleccionada == '')
    console.log("--..");
else 
    console.log("----------");