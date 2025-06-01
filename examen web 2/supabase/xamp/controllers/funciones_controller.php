<?php
require_once '../config/database.php';

class FuncionesController {
    // Obtener todas las funciones
    public function obtenerFunciones() {
        $sql = "SELECT f.*, p.titulo, s.nombre as sala_nombre 
                FROM funciones f 
                JOIN peliculas p ON f.pelicula_id = p.id 
                JOIN salas s ON f.sala_id = s.id";
        $result = ejecutarConsulta($sql);
        return obtenerFilas($result);
    }

    // Obtener funciones por fecha
    public function obtenerFuncionesPorFecha($fecha) {
        $sql = "SELECT f.*, p.titulo, s.nombre as sala_nombre 
                FROM funciones f 
                JOIN peliculas p ON f.pelicula_id = p.id 
                JOIN salas s ON f.sala_id = s.id 
                WHERE DATE(f.horario) = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "s", $fecha);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result);
    }

    // Crear una nueva función
    public function crearFuncion($pelicula_id, $sala_id, $horario) {
        $sql = "INSERT INTO funciones (pelicula_id, sala_id, horario) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "iis", $pelicula_id, $sala_id, $horario);
        return mysqli_stmt_execute($stmt);
    }

    // Verificar disponibilidad de sala
    public function verificarDisponibilidad($sala_id, $horario) {
        $sql = "SELECT * FROM funciones 
                WHERE sala_id = ? 
                AND horario = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "is", $sala_id, $horario);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_num_rows($result) == 0;
    }

    // Obtener funciones disponibles por película
    public function obtenerFuncionesPorPelicula($pelicula_id) {
        $sql = "SELECT f.*, s.nombre as sala_nombre 
                FROM funciones f 
                JOIN salas s ON f.sala_id = s.id 
                WHERE f.pelicula_id = ? 
                AND f.horario > NOW()";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $pelicula_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result);
    }
}
?>
