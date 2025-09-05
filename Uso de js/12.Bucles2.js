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

const NotaAprobacion = 51;
let i = 0;
let materiaSeleccionada = "" ;

do{

    if (datos[i].calificacion >= NotaAprobacion){
        materiaSeleccionada = datos[i].materia;
        break;
    }
    i++;

} while (i < datos.length && materiaSeleccionada == '')


if(materiaSeleccionada == "") 
    console.log('no aprobaste las materias');
else
    console.log('la materia aprobada es : ' + materiaSeleccionada);