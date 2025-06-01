<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'cine_db');

// Intentar conectar a MySQL usando credenciales por defecto de XAMPP
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

// Verificar la conexión
if (!$conn) {
    die("ERROR: No se pudo conectar. " . mysqli_connect_error());
}

// Crear la base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
if (mysqli_query($conn, $sql)) {
    echo "Base de datos creada exitosamente";
} else {
    echo "Error al crear la base de datos: " . mysqli_error($conn);
}

// Seleccionar la base de datos
mysqli_select_db($conn, DB_NAME);

// Configurar el conjunto de caracteres a UTF8
mysqli_set_charset($conn, "utf8");

// Función para ejecutar consultas
function ejecutarConsulta($sql) {
    global $conn;
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        die("Error en la consulta: " . mysqli_error($conn));
    }
    return $result;
}

// Función para obtener resultados como array asociativo
function obtenerFilas($result) {
    $filas = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $filas[] = $row;
    }
    return $filas;
}
?>
