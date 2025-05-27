<?php
require_once '../controllers/funciones_controller.php';
require_once '../controllers/peliculas_controller.php';
require_once '../controllers/salas_controller.php';

$funcionesController = new FuncionesController();
$peliculasController = new PeliculasController();
$salasController = new SalasController();

// Obtener listas de películas y salas
$peliculas = $peliculasController->obtenerPeliculas();
$salas = $salasController->obtenerSalas();

// Procesar el formulario si se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pelicula_id = $_POST['pelicula_id'];
    $sala_id = $_POST['sala_id'];
    $horario = $_POST['horario'];

    // Verificar disponibilidad de la sala
    if ($funcionesController->verificarDisponibilidad($sala_id, $horario)) {
        if ($funcionesController->crearFuncion($pelicula_id, $sala_id, $horario)) {
            header('Location: funciones.php');
            exit;
        } else {
            $error = "Error al crear la función";
        }
    } else {
        $error = "La sala ya está ocupada en ese horario";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Función - Sistema de Cine</title>
    <link href="../css/style.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Crear Nueva Función</h1>
        
        <?php if (isset($error)): ?>
        <div class="alert error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label for="pelicula_id">Película:</label>
                <select name="pelicula_id" id="pelicula_id" required>
                    <option value="">Selecciona una película</option>
                    <?php foreach ($peliculas as $pelicula): ?>
                    <option value="<?php echo $pelicula['id']; ?>"><?php echo $pelicula['titulo']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="sala_id">Sala:</label>
                <select name="sala_id" id="sala_id" required>
                    <option value="">Selecciona una sala</option>
                    <?php foreach ($salas as $sala): ?>
                    <option value="<?php echo $sala['id']; ?>"><?php echo $sala['nombre']; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label for="horario">Horario:</label>
                <input type="datetime-local" name="horario" id="horario" required>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary">Crear Función</button>
                <a href="funciones.php" class="btn-secondary">Cancelar</a>
            </div>
        </form>
    </div>
</body>
</html>
