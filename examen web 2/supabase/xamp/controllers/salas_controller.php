<?php
require_once '../config/database.php';

class SalasController {
    // Obtener todas las salas
    public function obtenerSalas() {
        $sql = "SELECT * FROM salas";
        $result = ejecutarConsulta($sql);
        return obtenerFilas($result);
    }

    // Obtener una sala por ID
    public function obtenerSala($id) {
        $sql = "SELECT * FROM salas WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result)[0] ?? null;
    }

    // Crear una nueva sala
    public function crearSala($nombre, $capacidad, $tipo, $descripcion) {
        $sql = "INSERT INTO salas (nombre, capacidad, tipo, descripcion) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "siss", $nombre, $capacidad, $tipo, $descripcion);
        return mysqli_stmt_execute($stmt);
    }

    // Actualizar una sala
    public function actualizarSala($id, $nombre, $capacidad, $tipo, $descripcion) {
        $sql = "UPDATE salas SET nombre = ?, capacidad = ?, tipo = ?, descripcion = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sissi", $nombre, $capacidad, $tipo, $descripcion, $id);
        return mysqli_stmt_execute($stmt);
    }

    // Eliminar una sala
    public function eliminarSala($id) {
        $sql = "DELETE FROM salas WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        return mysqli_stmt_execute($stmt);
    }
}
?>
