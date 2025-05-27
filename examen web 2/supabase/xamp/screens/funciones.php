<?php
require_once '../controllers/funciones_controller.php';
require_once '../controllers/peliculas_controller.php';
require_once '../controllers/salas_controller.php';

$funcionesController = new FuncionesController();
$peliculasController = new PeliculasController();
$salasController = new SalasController();

// Obtener todas las funciones
$funciones = $funcionesController->obtenerFunciones();
$peliculas = $peliculasController->obtenerPeliculas();
$salas = $salasController->obtenerSalas();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Funciones - Sistema de Cine</title>
    <link href="../css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Funciones del Cine</h1>
        
        <div class="actions">
            <button onclick="window.location.href='crear_funcion.php'">Crear Nueva Función</button>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Película</th>
                    <th>Sala</th>
                    <th>Horario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($funciones as $funcion): ?>
                <tr>
                    <td><?php echo $funcion['id']; ?></td>
                    <td><?php echo $funcion['titulo']; ?></td>
                    <td><?php echo $funcion['sala_nombre']; ?></td>
                    <td><?php echo date('d/m/Y H:i', strtotime($funcion['horario'])); ?></td>
                    <td>
                        <a href="editar_funcion.php?id=<?php echo $funcion['id']; ?>" class="btn-edit">Editar</a>
                        <a href="eliminar_funcion.php?id=<?php echo $funcion['id']; ?>" 
                           onclick="return confirm('¿Estás seguro de eliminar esta función?')" 
                           class="btn-delete">Eliminar</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
