<?php
require_once '../config/database.php';

// Intentar obtener datos de una tabla
$sql = "SELECT * FROM salas LIMIT 1";
$result = ejecutarConsulta($sql);

if ($result) {
    echo "¡Conexión exitosa a la base de datos!";
    
    // Mostrar una fila de ejemplo
    $filas = obtenerFilas($result);
    if (!empty($filas)) {
        echo "<br>Primer registro de la tabla salas:
        <pre>" . print_r($filas[0], true) . "</pre>";
    } else {
        echo "<br>No hay registros en la tabla salas.";
    }
} else {
    echo "Error en la consulta: " . mysqli_error($conn);
}
?>
